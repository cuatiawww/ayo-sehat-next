'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const articles = [
  {
    image:
      'https://images.unsplash.com/photo-1631507623121-eaaba8d4e7dc?w=1080&q=80',
    category: 'Kesehatan Umum',
    title:
      'Tips Menjaga Kesehatan di Musim Hujan: Hindari Penyakit Flu dan Demam',
    date: '5 Nov 2024',
    readTime: '5 Menit',
    slug: 'tips-kesehatan-musim-hujan',
  },
  {
    image:
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1080&q=80',
    category: 'Nutrisi',
    title:
      'Panduan Lengkap Vitamin dan Suplemen untuk Meningkatkan Imunitas Tubuh',
    date: '3 Nov 2024',
    readTime: '4 Menit',
    slug: 'panduan-vitamin-suplemen',
  },
  {
    image:
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1080&q=80',
    category: 'Vaksinasi',
    title:
      'Pentingnya Vaksinasi untuk Anak: Jadwal dan Jenis Vaksin yang Wajib',
    date: '1 Nov 2024',
    readTime: '6 Menit',
    slug: 'vaksinasi-anak',
  },
  {
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1080&q=80',
    category: 'Konsultasi Dokter',
    title:
      'Kapan Harus ke Dokter? Kenali Gejala yang Memerlukan Perhatian Medis',
    date: '30 Okt 2024',
    readTime: '4 Menit',
    slug: 'kapan-ke-dokter',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1080&q=80',
    category: 'Pemeriksaan Kesehatan',
    title:
      'Medical Check Up Rutin: Mengapa Penting dan Apa Saja yang Diperiksa?',
    date: '28 Okt 2024',
    readTime: '7 Menit',
    slug: 'medical-check-up',
  },
]

export default function ArticleSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const visibleArticles = [
    articles[currentIndex],
    articles[(currentIndex + 1) % articles.length],
    articles[(currentIndex + 2) % articles.length],
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary">
            Artikel Terbaru
          </h2>
          <Button variant="outline" asChild className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
            <Link href="/page/artikel">Lihat Artikel Lainnya</Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300 mb-6 sm:mb-8 lg:mb-10" />

        {/* Articles Grid/Carousel */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
            {visibleArticles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>

          {/* Tablet Grid */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 relative">
            {visibleArticles.slice(0, 2).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}

            {/* Tablet Navigation */}
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 btn-brand-primary w-9 h-9 rounded-full flex items-center justify-center shadow-lg z-10"
              aria-label="Artikel sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 btn-brand-primary w-9 h-9 rounded-full flex items-center justify-center shadow-lg z-10"
              aria-label="Artikel berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {articles.map((article, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-brand-primary rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-40"
              aria-label="Artikel sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === articles.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-brand-primary rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-40"
              aria-label="Artikel berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-10 h-2 bg-brand-primary shadow-md'
                      : 'w-2 h-2 bg-gray-400 hover:bg-gray-500'
                  }`}
                  aria-label={`Ke artikel ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Navigation */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute -left-8 xl:-left-12 top-1/2 -translate-y-1/2 btn-brand-primary w-10 h-10 xl:w-11 xl:h-11 rounded-full items-center justify-center shadow-lg z-10"
            aria-label="Artikel sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute -right-8 xl:-right-12 top-1/2 -translate-y-1/2 btn-brand-primary w-10 h-10 xl:w-11 xl:h-11 rounded-full items-center justify-center shadow-lg z-10"
            aria-label="Artikel berikutnya"
          >
            <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

// Article Card Component
function ArticleCard({ article }: { article: (typeof articles)[0] }) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group cursor-pointer w-full block"
    >
      <div className="relative w-full">
        {/* Image */}
        <div className="relative bg-brand-primary h-[180px] sm:h-[210px] lg:h-[248px] overflow-hidden rounded-xl mb-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Content */}
        <div className="relative pt-3 sm:pt-4 lg:pt-5">
          <div className="border-b border-gray-300 pb-3 sm:pb-4 lg:pb-5">
            <Badge
              variant="secondary"
              className="mb-2 sm:mb-3 text-tiny bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              {article.category}
            </Badge>

            <h3 className="text-body-md sm:text-body-lg lg:text-heading-sm text-gray-900 mb-3 sm:mb-4 lg:mb-6 group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            <div className="flex items-center gap-1.5 sm:gap-2 text-caption text-gray-600">
              <span>{article.date}</span>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <span>Waktu Baca {article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}