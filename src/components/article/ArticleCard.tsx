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
      className="group"
    >
      <Link
        href={`/artikel/${article.slug}`}
        className="flex flex-col sm:flex-row gap-5 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 p-4"
      >
        {/* Image - Left Side */}
        <div className="relative w-full sm:w-[280px] lg:w-[320px] h-[200px] sm:h-[180px] flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        </div>

        {/* Content - Right Side */}
        <div className="flex-1 flex flex-col justify-center space-y-3">
          {/* Category & Stage Badge */}
          <div className="flex items-center gap-2 text-caption text-brand-primary font-medium">
            <span>{article.lifecycleStage}</span>
            <span className="w-1 h-1 bg-brand-primary rounded-full" />
            <span>{article.category}</span>
          </div>

          {/* Title with Underline on Hover */}
          <h3 className="text-body-lg sm:text-heading-sm lg:text-heading-md font-semibold text-brand-primary line-clamp-2 leading-tight relative inline-block">
            <span className="relative">
              {article.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300" />
            </span>
          </h3>

          {/* Excerpt */}
          <p className="text-body-sm text-gray-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-3 text-caption text-gray-500 flex-wrap">
            <span>{article.date}</span>
            <span>•</span>
            <span>Dilihat {article.views} Kali</span>
            <span>•</span>
            <span>Waktu Baca {article.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}