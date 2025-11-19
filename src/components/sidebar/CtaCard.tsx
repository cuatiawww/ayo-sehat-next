'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface CTACardProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
  delay?: number
}

export default function CTACard({
  title,
  description,
  buttonText,
  buttonLink,
  image,
  delay = 0.3,
}: CTACardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Title di luar card */}
      <div className="mb-4">
        <h3 className="text-body-lg sm:text-heading-sm text-brand-primary font-bold">
          {title}
        </h3>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 380px"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-body-sm text-gray-600 leading-relaxed mb-6">
          {description}
        </p>

        {/* CTA Button */}
        <Link
          href={buttonLink}
          className="block w-full bg-brand-primary hover:bg-brand-primary-dark text-white text-center font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  )
}
