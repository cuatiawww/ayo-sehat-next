'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface RelatedArticle {
  id: number | string
  title: string
  description?: string
  excerpt?: string
  image: string
  category?: string[]
  lifecycleStage?: string[]
  date?: string
  readTime?: string
  slug?: string
}

interface RelatedArticlesCardProps {
  articles: RelatedArticle[]
  onViewMore?: () => void
  viewMoreLink?: string
  delay?: number
  useSlider?: boolean
}

export default function RelatedArticlesCard({
  articles,
  onViewMore,
  viewMoreLink = '/artikel',
  delay = 0.3,
  useSlider = true,
}: RelatedArticlesCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!articles || articles.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-body-lg sm:text-heading-sm text-brand-primary font-bold mb-1">
            Artikel Terkait
          </h3>
          <p className="text-tiny sm:text-caption text-gray-600">
            Baca artikel kesehatan terkini dan informatif
          </p>
        </div>
        <Link
          href={viewMoreLink}
          onClick={onViewMore}
          className="flex items-center gap-1 text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors whitespace-nowrap group"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Slider Card */}
      {useSlider ? (
        <div className="relative group/slider bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-[360px] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="w-full flex-shrink-0 h-full"
                >
                  <Link
                    href={`/artikel/${article.slug || article.id}`}
                    className="block h-full group/item"
                  >
                    {/* Image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 bg-white flex flex-col justify-between h-[160px]">
                      <div>
                        {/* Categories/Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {article.lifecycleStage && Array.isArray(article.lifecycleStage) && article.lifecycleStage.length > 0 && (
                            <span className="text-tiny text-brand-primary font-medium">
                              {article.lifecycleStage[0]}
                            </span>
                          )}
                          {article.lifecycleStage && Array.isArray(article.lifecycleStage) && article.lifecycleStage.length > 0 && article.category && Array.isArray(article.category) && article.category.length > 0 && (
                            <span className="text-tiny text-gray-400">•</span>
                          )}
                          {article.category && Array.isArray(article.category) && article.category.length > 0 && (
                            <span className="text-tiny text-brand-primary font-medium">
                              {article.category[0]}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-body-md font-semibold text-gray-900 group-hover/item:text-brand-primary transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                      </div>

                      {/* Meta */}
                      {(article.date || article.readTime) && (
                        <div className="flex items-center gap-2 text-tiny text-gray-500 mt-2">
                          {article.date && <span>{article.date}</span>}
                          {article.date && article.readTime && <span>•</span>}
                          {article.readTime && <span>{article.readTime} menit baca</span>}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {articles.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-[100px] -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10 opacity-0 group-hover/slider:opacity-100"
                aria-label="Artikel sebelumnya"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-[100px] -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10 opacity-0 group-hover/slider:opacity-100"
                aria-label="Artikel berikutnya"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots */}
          {articles.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-6 h-1.5 bg-brand-primary'
                      : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ke artikel ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/artikel/${article.slug || article.id}`}
              className="flex gap-3 group"
            >
              <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="100px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-body-sm font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-1">
                  {article.title}
                </h4>
                {(article.description || article.excerpt) && (
                  <p className="text-tiny text-gray-600 line-clamp-2">
                    {article.description || article.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
