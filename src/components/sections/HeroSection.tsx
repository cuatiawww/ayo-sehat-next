'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative bg-brand-primary h-[500px] sm:h-[650px] lg:h-[858px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Image
          src="/assets/hero.png"
          alt="Ilustrasi keluarga sehat bersama Kementerian Kesehatan RI - Ayo Sehat"
          title="Hero Banner Ayo Sehat - Portal Resmi Kemenkes RI"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative h-full container-custom flex flex-col justify-center">
        {/* Main Heading */}
        <motion.h1
          className="text-[36px] sm:text-[60px] lg:text-[100px] leading-tight text-white mb-4 sm:mb-6 lg:mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
        >
          Ayo Sehat
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          className="text-[22px] sm:text-[36px] lg:text-[38px] leading-tight text-white mb-6 sm:mb-8 lg:mb-10 max-w-[510px]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
        >
          Kementerian Kesehatan Republik Indonesia
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-body-sm sm:text-body-md lg:text-body-lg text-white mb-8 sm:mb-10 lg:mb-12 max-w-[640px]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
        >
          Ayo Sehat Kemenkes RI merupakan platform/saluran sumber informasi,
          edukasi kesehatan, serta gaya hidup sehat resmi dari Kementerian
          Kesehatan sehingga dapat dipertanggungjawabkan dan informasi yang
          diberikan sejalan dengan program pemerintah.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.4,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <Button
            asChild
            size="lg"
            className="btn-brand-accent h-[55px] sm:h-[70px] lg:h-[80px] px-8 sm:px-12 lg:px-16 text-[20px] sm:text-[26px] lg:text-[30px] rounded-full"
          >
            <Link href="/konsultasi">Mulai Konsultasi</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}