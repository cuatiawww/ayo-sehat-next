'use client'

import { useState } from 'react'
import { Calendar as X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Health Observances Data
interface HealthObservance {
  date: string // Format: "MM-DD"
  title: string
  description: string
}

const healthObservances: HealthObservance[] = [
  {
    date: '01-24',
    title: 'Hari Gizi Nasional',
    description:
      'Memperingati pentingnya gizi seimbang untuk kesehatan optimal dan pencegahan stunting pada anak-anak Indonesia.',
  },
  {
    date: '02-04',
    title: 'Hari Kanker Sedunia',
    description:
      'Meningkatkan kesadaran global tentang pencegahan, deteksi dini, dan pengobatan kanker untuk menyelamatkan jutaan nyawa.',
  },
  {
    date: '03-24',
    title: 'Hari Tuberkulosis Sedunia',
    description:
      'Membangun kesadaran global tentang TB dan upaya untuk mengakhiri epidemi penyakit menular ini.',
  },
  {
    date: '04-07',
    title: 'Hari Kesehatan Sedunia',
    description:
      'Memperingati pendirian WHO dan fokus pada isu kesehatan global yang memerlukan perhatian mendesak.',
  },
  {
    date: '05-12',
    title: 'Hari Perawat Internasional',
    description:
      'Menghormati dedikasi dan kontribusi perawat dalam memberikan pelayanan kesehatan berkualitas.',
  },
  {
    date: '09-12',
    title: 'Hari Kesehatan Nasional',
    description:
      'Memperingati gerakan kesehatan masyarakat Indonesia dan komitmen untuk Indonesia sehat.',
  },
  {
    date: '10-10',
    title: 'Hari Kesehatan Jiwa Sedunia',
    description:
      'Meningkatkan kesadaran tentang kesehatan mental dan menghilangkan stigma terhadap gangguan mental.',
  },
  {
    date: '11-14',
    title: 'Hari Diabetes Sedunia',
    description:
      'Meningkatkan kesadaran tentang diabetes, pentingnya pencegahan, dan pengelolaan gula darah.',
  },
  {
    date: '12-01',
    title: 'Hari AIDS Sedunia',
    description:
      'Meningkatkan kesadaran tentang HIV/AIDS, mengurangi stigma, dan mendorong pencegahan serta pengobatan.',
  },
]

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedObservance, setSelectedObservance] =
    useState<HealthObservance | null>(null)

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    // Convert Sunday (0) to end of week (6), and shift others down
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
    setSelectedObservance(null)
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
    setSelectedObservance(null)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const getObservanceForDate = (day: number): HealthObservance | undefined => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    const dateKey = `${month}-${dayStr}`
    return healthObservances.find((obs) => obs.date === dateKey)
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
    setSelectedDate(newDate)

    const observance = getObservanceForDate(day)
    setSelectedObservance(observance || null)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)

  const calendarDays = []

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary/10 p-2 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-body-md sm:text-body-lg font-semibold text-gray-900">
              Kalender Kesehatan 2025
            </h3>
            <p className="text-tiny sm:text-caption text-gray-600">
              Hari peringatan kesehatan nasional dan internasional
            </p>
          </div>
        </div>
      </div> */}

      {/* Calendar Body */}
      <div className="p-4">
        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <h4 className="text-body-md sm:text-body-lg font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="text-center text-tiny sm:text-caption font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const isTodayDate = isToday(day)
            const isSelectedDate = isSelected(day)
            const observance = getObservanceForDate(day)
            const hasObservance = !!observance

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`relative aspect-square flex items-center justify-center rounded-lg text-body-sm transition-all duration-200 ${
                  isSelectedDate
                    ? 'bg-gray-900 text-white font-bold shadow-md'
                    : isTodayDate
                    ? 'bg-brand-primary text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {day}
                {/* Dot indicator for health observance */}
                {hasObservance && !isSelectedDate && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary" />
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-body-sm text-gray-600">
                Tanggal dipilih:{' '}
                <span className="font-medium text-gray-900">
                  {selectedDate.getDate()}{' '}
                  {monthNames[selectedDate.getMonth()]}{' '}
                  {selectedDate.getFullYear()}
                </span>
              </p>
              {selectedObservance && (
                <Badge className="bg-brand-accent text-gray-900 hover:bg-brand-accent-dark">
                  Hari Kesehatan
                </Badge>
              )}
            </div>

            {/* Observance Details */}
            {selectedObservance ? (
              <div className="mt-3 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 border-l-4 border-brand-primary rounded-lg p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="text-body-md sm:text-body-lg font-semibold text-brand-primary mb-2">
                      {selectedObservance.title}
                    </h4>
                    <p className="text-body-xs sm:text-body-sm text-gray-700 leading-relaxed">
                      {selectedObservance.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedObservance(null)
                      setSelectedDate(undefined)
                    }}
                    className="text-gray-400 hover:text-brand-primary transition-colors"
                    aria-label="Tutup detail"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-body-sm text-gray-500 italic mt-2">
                Tidak ada peringatan kesehatan pada tanggal ini
              </p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-caption text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-900" />
              <span>Hari ini</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-brand-primary" />
              <span>Hari kesehatan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}