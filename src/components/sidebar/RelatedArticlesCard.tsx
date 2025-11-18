'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface RelatedArticle {
  id: number | string
  title: string
  description?: string
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
  maxItems?: number
}

export default function RelatedArticlesCard({
  articles,
  onViewMore,
  viewMoreLink = '/artikel',
  delay = 0.3,
  maxItems = 5,
}: RelatedArticlesCardProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  const displayedArticles = articles.slice(0, maxItems)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-body-lg sm:text-heading-sm text-brand-primary font-bold">
          Artikel Terkait
        </h3>
        {(onViewMore || viewMoreLink) && (
          <Link
            href={viewMoreLink}
            onClick={onViewMore}
            className="flex items-center gap-1 text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors group"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {displayedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/artikel/${article.slug || article.id}`}
            className="flex gap-3 group"
          >
            {/* Image */}
            <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="100px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Categories/Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {article.lifecycleStage && article.lifecycleStage.length > 0 && (
                  <span className="text-tiny text-brand-primary font-medium">
                    {article.lifecycleStage[0]}
                  </span>
                )}
                {article.lifecycleStage && article.lifecycleStage.length > 0 && article.category && article.category.length > 0 && (
                  <span className="text-tiny text-gray-400">•</span>
                )}
                {article.category && article.category.length > 0 && (
                  <span className="text-tiny text-brand-primary font-medium">
                    {article.category[0]}
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-body-sm font-semibold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 mb-1 leading-tight">
                {article.title}
              </h4>

              {/* Description */}
              {article.description && (
                <p className="text-tiny text-gray-600 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* View More at Bottom */}
      {articles.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href={viewMoreLink}
            onClick={onViewMore}
            className="flex items-center justify-end gap-1 text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors group"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </motion.div>
  )
}