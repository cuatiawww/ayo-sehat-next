'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PartnershipCardProps {
  title?: string
  description?: string
  image?: string
  buttonText?: string
  buttonLink?: string
}

export default function PartnershipCard({
  title = 'Kemitraan',
  description = 'Satu tindakan kecil hari ini dapat membantu mencegah penyebaran penyakit. Mari dukung kampanye kesehatan untuk menjaga kesehatan kita dan orang-orang di sekitar kita.',
  image = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
  buttonText = 'Bergabung',
  buttonLink = '/kemitraan',
}: PartnershipCardProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-body-lg sm:text-heading-sm font-bold text-brand-primary mb-1">
          {title}
        </h3>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <div className="relative w-full h-[200px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-body-sm text-gray-700 leading-relaxed mb-5">
            {description}
          </p>

          {/* CTA Button */}
          <Link href={buttonLink} className="block">
            <Button className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-medium rounded-xl py-6 shadow-md hover:shadow-lg transition-all duration-300 group">
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                {buttonText}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
