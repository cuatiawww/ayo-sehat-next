'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Campaign {
  id: string
  image: string
  title: string
  description?: string
  link?: string
}

interface CampaignCardProps {
  campaigns: Campaign[]
  viewMoreLink?: string
}

export default function CampaignCard({ 
  campaigns,
  viewMoreLink = '/kampanye'
}: CampaignCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % campaigns.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + campaigns.length) % campaigns.length)
  }

  if (!campaigns || campaigns.length === 0) {
    return null
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-body-lg sm:text-heading-sm font-bold text-brand-primary mb-1">
            Kampanye Kesehatan
          </h3>
          <p className="text-tiny sm:text-caption text-gray-600">
            Informasi terkait dengan kampanye kesehatan yang sedang berlangsung
          </p>
        </div>
        <Link
          href={viewMoreLink}
          className="text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors whitespace-nowrap flex items-center gap-1 group"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Card with Slider */}
      <div className="relative">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {campaigns.map((campaign, index) => (
                <div
                  key={campaign.id || index}
                  className="w-full flex-shrink-0"
                >
                  <Link
                    href={campaign.link || `/kampanye/${campaign.id}`}
                    className="block group/item"
                  >
                    {/* Campaign Image */}
                    <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden">
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>

                    {/* Campaign Content */}
                    <div className="p-5 bg-white">
                      <h4 className="text-body-md sm:text-body-lg font-semibold text-gray-900 text-center group-hover/item:text-brand-primary transition-colors duration-300 line-clamp-2">
                        {campaign.title}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {campaigns.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-[90px] sm:top-[100px] -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
                aria-label="Kampanye sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-[90px] sm:top-[100px] -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
                aria-label="Kampanye berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {campaigns.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {campaigns.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-6 h-1.5 bg-brand-primary'
                    : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ke kampanye ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
