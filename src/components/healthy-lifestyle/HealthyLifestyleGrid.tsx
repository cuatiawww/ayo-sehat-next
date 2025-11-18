'use client'

import HealthyLifestyleCard from './HealthyLifestyleCard'

interface HealthyLifestyleItem {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category?: string
}

interface HealthyLifestyleGridProps {
  items: HealthyLifestyleItem[]
}

export default function HealthyLifestyleGrid({
  items,
}: HealthyLifestyleGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-heading-sm text-gray-700 mb-2 font-medium">
          Tidak ada konten tersedia
        </h3>
        <p className="text-body-md text-gray-500 max-w-md mx-auto">
          Konten perilaku hidup sehat sedang dalam tahap pengembangan
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      {items.map((item, index) => (
        <HealthyLifestyleCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}