'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface RelatedArticle {
  id: number | string
  title: string
  description?: string
  image: string
  category?: string[]
  date?: string
  readTime?: string
  slug?: string
}

interface RelatedArticlesCardProps {
  articles: RelatedArticle[]
  onViewMore?: () => void
  delay?: number
  maxItems?: number
}

export default function RelatedArticlesCard({
  articles,
  onViewMore,
  delay = 0.4,
  maxItems = 4,
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
      className="flex flex-col gap-5"
    >
      <h3 className="text-body-lg sm:text-heading-sm text-gray-900 font-semibold">
        Artikel Terkait
      </h3>

      <div className="flex flex-col gap-4">
        {displayedArticles.map((article, index) => (
          <div key={article.id}>
            {index > 0 && <div className="h-px bg-gray-200 mb-4" />}
            
            <Link
              href={`/artikel/${article.slug || article.id}`}
              className="flex gap-3 sm:gap-4 items-start group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-[100px] w-[110px] sm:h-[120px] sm:w-[130px] rounded-lg overflow-hidden shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                {/* Categories */}
                {article.category && article.category.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {article.category.slice(0, 2).map((cat, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-tiny bg-brand-primary/10 text-brand-primary"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h4 className="text-body-sm sm:text-body-md text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 font-medium">
                  {article.title}
                </h4>

                {/* Description */}
                {article.description && (
                  <p className="text-tiny sm:text-caption text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                )}

                {/* Meta */}
                {(article.date || article.readTime) && (
                  <div className="flex items-center gap-2 text-tiny text-gray-500">
                    {article.date && <span>{article.date}</span>}
                    {article.date && article.readTime && (
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                    )}
                    {article.readTime && <span>{article.readTime}</span>}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* View More */}
      {articles.length > maxItems && (
        <>
          <div className="h-px bg-gray-200" />
          <div className="flex justify-end">
            <button
              onClick={onViewMore}
              className="flex items-center gap-2 text-brand-primary text-body-sm hover:text-brand-primary-dark transition-colors group"
            >
              <span>Lihat Lainnya</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}