/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import data from '@/data/kampanye.json'

// Gabungkan semua kampanye dari kedua kategori
const allCampaigns = [...data.priorityCampaigns, ...data.healthCampaigns]

export default function CampaignSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Show 2 cards at a time
  const cardsPerView = 2
  const totalSlides = Math.ceil(allCampaigns.length / cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const startIndex = currentIndex * cardsPerView
  const visibleCampaigns = allCampaigns.slice(startIndex, startIndex + cardsPerView)

  return (
    <section className="bg-white section-padding-lg">
      <div className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-3">
            Kampanye Kami
          </h2>
          <p className="text-body-md sm:text-body-lg text-gray-600 max-w-3xl mx-auto">
            Inisiatif edukasi dan ajakan hidup sehat untuk meningkatkan kesadaran
            dan partisipasi masyarakat.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Cards Grid */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {visibleCampaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-body-lg sm:text-heading-sm font-bold text-brand-primary mb-3">
                      {campaign.title}
                    </h3>
                    <p className="text-body-sm sm:text-body-md text-gray-600 leading-relaxed line-clamp-2">
                      {campaign.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons - Only show if more than 2 campaigns */}
          {allCampaigns.length > cardsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-brand-primary" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-brand-primary" />
              </button>
            </>
          )}

          {/* Dots - Only show if more than 1 slide */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-brand-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}