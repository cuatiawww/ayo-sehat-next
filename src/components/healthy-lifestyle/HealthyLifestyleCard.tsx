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
        className="block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Image */}
        <div className="relative h-[180px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-5 relative">
          {/* Title */}
          <h3 className="text-body-md sm:text-body-lg font-bold text-brand-primary mb-2 line-clamp-1 pr-10">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-body-sm text-gray-600 leading-relaxed line-clamp-2 pr-10">
            {item.description}
          </p>

          {/* Arrow Icon Circle - positioned absolute */}
          <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-md">
            <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
