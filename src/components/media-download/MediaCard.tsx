'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'

interface MediaItem {
  id: number
  title: string
  image: string
  category: string
  date: string
  downloads: number
  slug: string
}

interface MediaCardProps {
  item: MediaItem
  index: number
}

export default function MediaCard({ item, index }: MediaCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link
        href={`/media-download/${item.slug}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-[220px] overflow-hidden bg-gray-50">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-tiny rounded-full font-medium">
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-body-md font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[48px] group-hover:text-brand-primary transition-colors">
            {item.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-caption text-gray-500 mb-3">
            <span>{item.date}</span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {item.downloads.toLocaleString()} kali diunduh
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
