'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, Eye } from 'lucide-react'

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
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
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
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button className="flex items-center gap-2 bg-white text-brand-primary px-4 py-2 rounded-full text-body-sm font-medium hover:bg-brand-primary hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
            <span>Lihat Detail</span>
          </button>
        </div>
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

        {/* Download Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-2.5 rounded-lg hover:bg-brand-primary-dark transition-colors font-medium text-body-sm">
          <Download className="w-4 h-4" />
          <span>Unduh</span>
        </button>
      </div>
    </motion.article>
  )
}