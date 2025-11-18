'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  {
    image: '/assets/image.png',
    name: 'Bayi dan Balita',
    age: '< 5 Tahun',
    slug: 'bayi-balita',
  },
  {
    image: '/assets/Image (4).png',
    name: 'Anak-Anak',
    age: '5-9 Tahun',
    slug: 'anak-anak',
  },
  {
    image: '/assets/Image (1).png',
    name: 'Remaja',
    age: '10-18 Tahun',
    slug: 'remaja',
  },
  {
    image: '/assets/Image (2).png',
    name: 'Dewasa',
    age: '18-59 Tahun',
    slug: 'dewasa',
  },
  {
    image: '/assets/Image (3).png',
    name: 'Lansia',
    age: '60+ Tahun',
    slug: 'lansia',
  },
]

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    const newScroll =
      direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount

    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section-padding-lg bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary mb-4 sm:mb-6">
            Menu Siklus Hidup
          </h2>
          <p className="text-body-md sm:text-body-lg lg:text-heading-sm text-gray-600 max-w-3xl mx-auto">
            Pendekatan menjaga kesehatan sejak lahir hingga lansia, dengan
            perhatian khusus sesuai kebutuhan di setiap tahap usia.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-xl hover:bg-white hover:scale-110 transition-all"
            aria-label="Scroll kiri"
          >
            <ChevronLeft size={20} className="text-brand-primary" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-xl hover:bg-white hover:scale-110 transition-all"
            aria-label="Scroll kanan"
          >
            <ChevronRight size={20} className="text-brand-primary" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 pl-12 pr-16"
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-6 pb-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Category Card Component
function CategoryCard({
  category,
}: {
  category: (typeof categories)[0]
}) {
  return (
    <Link
      href={`/page/siklus-hidup/${category.slug}`}
      className="flex-none w-[220px] lg:w-full snap-center group cursor-pointer flex flex-col items-center"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square mx-auto transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-105">
        {/* Background */}
        <div className="absolute inset-0 bg-brand-primary rounded-[25px] transition-all duration-500 group-hover:shadow-card" />

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-[25px] border-2 border-brand-accent animate-pulse" />
        </div>

        {/* Image */}
        <div className="absolute inset-0 rounded-[25px] overflow-hidden transition-all duration-500 group-hover:rotate-1">
          <Image
            src={category.image}
            alt={`Ilustrasi kategori kesehatan: ${category.name} usia ${category.age}`}
            title={`${category.name} - Usia ${category.age}`}
            fill
            className="object-cover rounded-[25px] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>

        {/* Text Label */}
        <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 bg-brand-accent rounded-2xl h-[64px] lg:h-[84px] w-[170px] lg:w-[222px] flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-brand-accent-dark group-hover:shadow-lg group-hover:-translate-y-2 group-hover:scale-105 z-10 px-2">
          <p className="font-semibold text-[16px] lg:text-[23px] leading-tight text-gray-800 text-center transition-all duration-300 group-hover:scale-110">
            {category.name}
          </p>
          <p className="font-light text-[9px] lg:text-[14px] text-gray-700 text-center">
            {category.age}
          </p>
        </div>
      </div>
    </Link>
  )
}