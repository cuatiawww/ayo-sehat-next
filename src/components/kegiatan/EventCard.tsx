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
        className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Image with Date Badge (Mobile Only) */}
        <div className="relative w-full sm:w-[165px] h-[165px] flex-shrink-0">
          {/* Mobile: Image with padding */}
          <div className="relative w-full h-full p-4 sm:p-0">
            <div className="relative w-full h-full rounded-xl sm:rounded-none overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, 165px"
              />
              
              {/* Date Badge - Mobile (absolute pada gambar) */}
              <div
                className={`sm:hidden absolute top-3 left-3 w-[60px] h-[60px] rounded-lg flex flex-col items-center justify-center text-white font-semibold shadow-lg ${
                  event.status === 'ongoing'
                    ? 'bg-brand-primary'
                    : 'bg-brand-accent text-gray-900'
                }`}
              >
                <span className="text-body-md leading-tight">
                  {event.displayDate.split(' ')[0]}
                </span>
                <span className="text-tiny leading-tight">
                  {event.displayDate.split(' ')[1]}
                </span>
                <span className="text-tiny leading-tight">
                  {event.displayDate.split(' ')[2]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-4 pb-4 sm:py-5 sm:pl-5 sm:pr-4">
          {/* Title - Max 3 lines with ellipsis */}
          <h3 className="text-body-lg sm:text-heading-sm font-semibold text-brand-primary mb-2 group-hover:text-brand-primary-dark transition-colors line-clamp-3 overflow-hidden">
            {event.title}
          </h3>

          {/* Description - Max 3 lines with ellipsis */}
          <p className="text-body-sm sm:text-body-md text-gray-600 line-clamp-3 flex-1 overflow-hidden">
            {event.description}
          </p>
        </div>

        {/* Date Badge - Desktop (with margin right) */}
        <div className="hidden sm:flex flex-shrink-0 mr-4 my-4">
          <div
            className={`w-[70px] h-[70px] rounded-b-xl flex flex-col items-center justify-center text-white font-semibold ${
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
        </div>
      </Link>
    </motion.article>
  )
}
