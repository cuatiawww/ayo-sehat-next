/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Calendar as X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Health Observances Data
interface HealthObservance {
  date: string // Format: "MM-DD"
  title: string
  description: string
  category?: string
}

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedObservance, setSelectedObservance] =
    useState<HealthObservance | null>(null)
  const [healthObservances, setHealthObservances] = useState<HealthObservance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch health observances from API
  useEffect(() => {
    const fetchHealthObservances = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/health-calendar')

        if (!response.ok) {
          throw new Error('Failed to fetch health calendar data')
        }

        const result = await response.json()

        if (result.success && result.data) {
          setHealthObservances(result.data)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching health calendar:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHealthObservances()
  }, [])

  // Find closest health observance on mount
  const findClosestObservance = () => {
    if (healthObservances.length === 0) return null

    const today = new Date()
    const currentYear = today.getFullYear()

    // Create array of observances with full dates
    const observancesWithDates = healthObservances.map((obs: HealthObservance) => {
      const [month, day] = obs.date.split('-').map(Number)
      const obsDate = new Date(currentYear, month - 1, day)

      // If date has passed this year, consider next year
      if (obsDate < today) {
        obsDate.setFullYear(currentYear + 1)
      }

      return {
        ...obs,
        fullDate: obsDate,
        daysDiff: Math.floor((obsDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      }
    })

    // Sort by days difference and get the closest one
    observancesWithDates.sort((a: any, b: any) => a.daysDiff - b.daysDiff)

    return observancesWithDates[0]
  }

  // Auto-select closest observance on mount
  useEffect(() => {
    if (healthObservances.length > 0) {
      const closest = findClosestObservance()
      if (closest) {
        setSelectedDate(closest.fullDate)
        setCurrentDate(closest.fullDate)
        setSelectedObservance({
          date: closest.date,
          title: closest.title,
          description: closest.description,
          category: closest.category
        })
      }
    }
  }, [healthObservances])

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
    return healthObservances.find((obs: HealthObservance) => obs.date === dateKey)
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

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mb-3"></div>
            <p className="text-caption text-gray-600">Memuat kalender kesehatan...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-8 text-center">
          <div className="text-red-500 mb-2">
            <X className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-body-md font-semibold text-gray-900 mb-1">
            Gagal Memuat Kalender
          </p>
          <p className="text-caption text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Calendar Body */}
      <div className="p-3">
        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={previousMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <h4 className="text-body-md font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>

          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="text-center text-tiny font-medium text-gray-600 py-1.5"
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
                className={`relative aspect-square flex items-center justify-center rounded-lg text-caption transition-all duration-200 ${
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
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-primary" />
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Date Info - Fixed Height */}
        <div className="mt-3 pt-3 border-t border-gray-100 min-h-[140px]">
          {selectedDate && selectedObservance ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-caption text-gray-600">
                  <span className="font-medium text-gray-900">
                    {selectedDate.getDate()}{' '}
                    {monthNames[selectedDate.getMonth()]}{' '}
                    {selectedDate.getFullYear()}
                  </span>
                </p>
                <Badge className="bg-brand-accent text-gray-900 hover:bg-brand-accent-dark text-tiny">
                  Hari Kesehatan
                </Badge>
              </div>

              {/* Observance Details */}
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 border-l-3 border-brand-primary rounded-lg p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-body-sm font-semibold text-brand-primary mb-1">
                      {selectedObservance.title}
                    </h4>
                    <p className="text-caption text-gray-700 leading-snug">
                      {selectedObservance.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedObservance(null)
                      setSelectedDate(undefined)
                    }}
                    className="text-gray-400 hover:text-brand-primary transition-colors flex-shrink-0"
                    aria-label="Tutup detail"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center py-4">
              <p className="text-caption text-gray-500 italic">
                Berikut tanggal kesehatan terkait
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-tiny text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-brand-primary" />
              <span>Hari ini</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-gray-900" />
              <span>Dipilih</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
