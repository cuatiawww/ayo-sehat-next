'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const features = [
  {
    image: '/assets/content1.png',
    category: 'Kesehatan Jantung',
    description:
      'Jaga kesehatan jantung Anda dengan pola makan sehat, olahraga teratur, dan pemeriksaan rutin untuk mencegah penyakit kardiovaskular.',
    slug: 'kesehatan-jantung',
  },
  {
    image: '/assets/content2.png',
    category: 'Pola Makan Sehat',
    description:
      'Terapkan pola makan bergizi seimbang dengan konsumsi sayur, buah, protein, dan karbohidrat kompleks untuk tubuh yang lebih sehat.',
    slug: 'pola-makan-sehat',
  },
  {
    image: '/assets/content3.png',
    category: 'Olahraga Rutin',
    description:
      'Aktivitas fisik teratur minimal 150 menit per minggu dapat meningkatkan kesehatan fisik dan mental Anda secara signifikan.',
    slug: 'olahraga-rutin',
  },
]

export default function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg bg-gray-50 overflow-hidden"
    >
      <div className="container-custom">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <FeatureCard feature={feature} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-brand-primary rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Slide sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === features.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-brand-primary rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Slide berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-10 h-3 bg-brand-primary shadow-md'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ke slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Card Component
function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <Link
      href={`/artikel/${feature.slug}`}
      className="card-brand group cursor-pointer hover:shadow-card-hover hover:-translate-y-3 hover:border-brand-primary/30 transition-all duration-500 flex flex-col h-full"
    >
      <div className="w-full flex flex-col p-5 sm:p-6 lg:p-7">
        {/* Image Section */}
        <div className="relative h-[200px] sm:h-[180px] lg:h-[199px] rounded-xl overflow-hidden mb-4 sm:mb-5 lg:mb-7 flex-shrink-0">
          <Image
            src={feature.image}
            alt={feature.category}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Corner Badge
          <div className="absolute top-3 right-3 bg-brand-primary text-white px-3 py-1 rounded-full text-tiny font-semibold opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-1">
            Lihat Detail
            <ArrowRight className="w-3 h-3" />
          </div> */}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="mb-3 sm:mb-4 lg:mb-5 relative inline-block">
            <div className="text-body-md sm:text-body-lg text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300">
              {feature.category}
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-500" />
          </div>

          <p className="text-body-xs sm:text-body-sm text-gray-900 flex-1 line-clamp-5 sm:line-clamp-6 group-hover:text-gray-700 transition-colors duration-300">
            {feature.description}
          </p>

          <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-brand-primary text-body-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-300">
              Baca Selengkapnya
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  )
}
