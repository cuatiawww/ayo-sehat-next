'use client'

import MediaCard from './MediaCard'
import { FileX } from 'lucide-react'

interface MediaItem {
  id: number
  title: string
  image: string
  category: string
  date: string
  downloads: number
  slug: string
}

interface MediaGridProps {
  items: MediaItem[]
}

export default function MediaGrid({ items }: MediaGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <FileX className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-heading-sm text-gray-700 mb-2 font-medium">
          Tidak ada media ditemukan
        </h3>
        <p className="text-body-md text-gray-500 max-w-md mx-auto">
          Coba ubah filter untuk melihat media lainnya
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <MediaCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}