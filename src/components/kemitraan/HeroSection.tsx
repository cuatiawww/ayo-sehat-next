/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  const heroImage =
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80'

  return (
    <>
      {/* Hero Image Section - Full Width */}
      <section className="relative w-full">
        <div className="relative h-[280px] sm:h-[350px] lg:h-[420px] w-full">
          <img
            src={heroImage}
            alt="Tim Kemitraan Kesehatan"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </section>

      {/* Content Section - Teal Background */}
      <section className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white py-10 sm:py-12 lg:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-heading-lg sm:text-display-sm lg:text-display-md font-bold mb-4 text-white">
              Bersama Untuk Kesehatan Indonesia Lebih Baik
            </h1>
            <p className="text-body-md sm:text-body-lg leading-relaxed text-white">
              Kolaborasi antara pemerintah, masyarakat, dan mitra strategis
              untuk meningkatkan program kesehatan yang lebih inklusif,
              inovatif, dan berkelanjutan. Bersama, kita wujudkan Indonesia yang
              lebih sehat dan berkualitas.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}