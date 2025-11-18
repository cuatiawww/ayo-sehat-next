'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Topic {
  id: number
  title: string
  image: string
  category: string
  alt: string
  width: number
  height: number
}

interface TopicCarouselProps {
  topics: Topic[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  maxIndex: number
}

export default function TopicCarousel({
  topics,
  currentIndex,
  onPrevious,
  onNext,
  maxIndex,
}: TopicCarouselProps) {
  if (!topics || topics.length === 0) return null

  return (
    <div>
      <h2 className="text-heading-md sm:text-heading-lg lg:text-display-sm text-brand-primary mb-4 sm:mb-6 font-semibold">
        Topik Kesehatan Terkait
      </h2>

      <div className="relative group/carousel">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 disabled:cursor-not-allowed"
          aria-label="Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 text-brand-primary" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 disabled:cursor-not-allowed"
          aria-label="Berikutnya"
        >
          <ChevronRight className="w-6 h-6 text-brand-primary" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 sm:gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {topics.map((topic) => (
              <motion.div
                key={topic.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="group h-[245px] rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all cursor-pointer">
                  {/* Image */}
                  <div className="h-[151px] overflow-hidden">
                    <Image
                      src={topic.image}
                      alt={topic.alt}
                      width={topic.width}
                      height={topic.height}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="h-[94px] flex items-center justify-center px-4 bg-white group-hover:bg-brand-primary transition-colors">
                    <p className="text-body-md sm:text-body-lg font-medium text-center text-brand-primary group-hover:text-white transition-colors">
                      {topic.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}