'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HealthyLifestyleItem {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category?: string
}

interface HealthyLifestyleCardProps {
  item: HealthyLifestyleItem
  index: number
}

export default function HealthyLifestyleCard({
  item,
  index,
}: HealthyLifestyleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/perilaku-hidup-sehat/${item.slug}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full"
      >
        {/* Image */}
        <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge (if category exists) */}
          {item.category && (
            <div className="absolute top-3 right-3 bg-brand-primary text-white px-3 py-1 rounded-full text-tiny sm:text-caption font-medium">
              {item.category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Title */}
          <h3 className="text-body-md sm:text-body-lg lg:text-heading-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-body-sm sm:text-body-md text-gray-600 line-clamp-3 mb-4">
            {item.description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-brand-primary text-body-sm sm:text-body-md font-medium group-hover:gap-3 transition-all">
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}