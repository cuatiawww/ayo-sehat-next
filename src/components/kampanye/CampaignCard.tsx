'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Campaign {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category: 'prioritas' | 'kesehatan'
}

interface CampaignCardProps {
  campaign: Campaign
  index: number
}

export default function CampaignCard({ campaign, index }: CampaignCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link
        href={`/kampanye/${campaign.slug}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Title */}
          <h3 className="text-body-lg sm:text-heading-sm font-semibold text-brand-primary mb-2 group-hover:text-brand-primary-dark transition-colors">
            {campaign.title}
          </h3>

          {/* Description */}
          <p className="text-body-sm sm:text-body-md text-gray-600 line-clamp-2 mb-4">
            {campaign.description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-brand-primary text-body-sm font-medium">
            <span className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}