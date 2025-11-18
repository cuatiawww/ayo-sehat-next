'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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

interface EventCardProps {
  event: Event
  index: number
}

export default function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/kegiatan/${event.slug}`}
        className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5"
      >
        {/* Image */}
        <div className="relative w-full sm:w-[165px] h-[165px] flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="165px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-body-lg sm:text-heading-sm font-semibold text-brand-primary mb-2 group-hover:text-brand-primary-dark transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-body-sm sm:text-body-md text-gray-600 line-clamp-3 flex-1">
            {event.description}
          </p>
        </div>

        {/* Date Badge */}
        <div
          className={`flex-shrink-0 w-[70px] h-[70px] rounded-xl flex flex-col items-center justify-center text-white font-semibold ${
            event.status === 'ongoing'
              ? 'bg-brand-primary'
              : 'bg-brand-accent text-gray-900'
          }`}
        >
          <span className="text-body-lg leading-tight">
            {event.displayDate.split(' ')[0]}
          </span>
          <span className="text-caption leading-tight">
            {event.displayDate.split(' ')[1]}
          </span>
          <span className="text-caption leading-tight">
            {event.displayDate.split(' ')[2]}
          </span>
        </div>
      </Link>
    </motion.article>
  )
}