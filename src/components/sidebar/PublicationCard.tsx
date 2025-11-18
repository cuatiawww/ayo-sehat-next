'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Publication {
  id: number | string
  title: string
  type?: string
  image: string
  link?: string
}

interface PublicationCardProps {
  publications: Publication[]
  viewMoreLink?: string
  delay?: number
}

export default function PublicationCard({
  publications,
  viewMoreLink = '/publikasi',
  delay = 0.4,
}: PublicationCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!publications || publications.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % publications.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + publications.length) % publications.length
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-body-lg sm:text-heading-sm text-brand-primary font-bold mb-1">
            Media Publikasi Terkait
          </h3>
          <p className="text-tiny sm:text-caption text-gray-600">
            Informasi terkait dengan media publikasi kesehatan yang tersedia
          </p>
        </div>
        <Link
          href={viewMoreLink}
          className="flex items-center gap-1 text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors whitespace-nowrap group"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Slider */}
      <div className="relative group/slider bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-[320px] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {publications.map((publication) => (
              <div
                key={publication.id}
                className="w-full flex-shrink-0 h-full"
              >
                <Link
                  href={publication.link || `/publikasi/${publication.id}`}
                  className="block h-full group/item"
                >
                  {/* Image */}
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 bg-white flex items-center justify-center h-[100px]">
                    <p className="text-body-sm sm:text-body-md font-semibold text-brand-primary text-center line-clamp-3 group-hover/item:text-brand-primary-dark transition-colors">
                      {publication.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {publications.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-[110px] -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10 opacity-0 group-hover/slider:opacity-100"
              aria-label="Publikasi sebelumnya"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-[110px] -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10 opacity-0 group-hover/slider:opacity-100"
              aria-label="Publikasi berikutnya"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots */}
        {publications.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {publications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-6 h-1.5 bg-brand-primary'
                    : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ke publikasi ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}