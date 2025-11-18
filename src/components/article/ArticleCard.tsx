'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  views: string
  readTime: string
  category: string
  lifecycleStage: string
  slug: string
}

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <Link href={`/artikel/${article.slug}`} className="block">
        {/* Image */}
        <div className="h-[180px] xs:h-[200px] sm:h-[220px] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            width={400}
            height={220}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4 xs:p-5 space-y-3">
          {/* Category & Stage */}
          <div className="flex items-center gap-2 text-tiny xs:text-caption text-brand-primary flex-wrap">
            <span>{article.lifecycleStage}</span>
            <span className="w-1 h-1 bg-brand-primary rounded-full" />
            <span>{article.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-body-md xs:text-body-lg sm:text-heading-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-body-xs xs:text-body-sm text-gray-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-tiny sm:text-caption text-gray-500 flex-wrap">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.views} views</span>
            <span>•</span>
            <span>{article.readTime} min</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}