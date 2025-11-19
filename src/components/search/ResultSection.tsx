/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CircleArrowRight } from 'lucide-react'
import SearchResultCard from './SearchResultCard'

interface ResultSectionProps {
  title: string
  subtitle: string
  items: any[]
  searchQuery: string
  categoryType: 'articles' | 'download' | 'topics' | 'agenda'
}

export default function ResultSection({
  title,
  subtitle,
  items,
  searchQuery,
  categoryType,
}: ResultSectionProps) {
  const getViewMoreLink = () => {
    const baseUrl = 'page/search'
    return `${baseUrl}?q=${encodeURIComponent(searchQuery)}&category=${categoryType}`
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-10 lg:mb-12"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-heading-sm sm:text-heading-md lg:text-heading-lg text-brand-primary mb-2 font-semibold">
          {title}
        </h2>
        <p className="text-body-sm sm:text-body-md text-gray-600">
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-12 lg:gap-y-10">
        {items.map((item) => (
          <SearchResultCard key={item.id} item={item} />
        ))}
      </div>

      {/* View More */}
      <div className="mt-6 flex justify-end">
        <Link
          href={getViewMoreLink()}
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark transition-colors text-body-sm sm:text-body-md font-medium group"
        >
          Selengkapnya
          <CircleArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.section>
  )
}
