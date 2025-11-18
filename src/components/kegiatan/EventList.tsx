'use client'

import EventCard from './EventCard'
import { Calendar } from 'lucide-react'

interface Event {
  id: number
  title: string
  description: string
  image: string
  date: string
  displayDate: string
  slug: string
  status: 'ongoing' | 'upcoming'
}

interface EventListProps {
  title: string
  events: Event[]
  type: 'ongoing' | 'upcoming'
}

export default function EventList({ title, events, type }: EventListProps) {
  if (!events || events.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-heading-lg sm:text-display-sm text-brand-primary mb-6 font-semibold">
          {title}
        </h2>
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-body-md text-gray-500">
            Tidak ada kegiatan {type === 'ongoing' ? 'yang sedang berlangsung' : 'yang akan datang'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-heading-lg sm:text-display-sm text-brand-primary mb-6 font-semibold">
        {title}
      </h2>
      <div className="space-y-4 sm:space-y-5">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {/* View All Link */}
      {events.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-brand-primary hover:text-brand-primary-dark text-body-md font-medium transition-colors">
            Lihat Semua
          </button>
        </div>
      )}
    </div>
  )
}