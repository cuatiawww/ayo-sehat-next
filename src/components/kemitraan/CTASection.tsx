'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary-dark text-white section-padding-lg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md font-bold mb-4">
            Yuk bergabung sebagai mitra kementerian kesehatan!
          </h2>
          <p className="text-body-md sm:text-body-lg leading-relaxed mb-8 text-white/90">
            Kerjasama dan kolaborasi menuju Indonesia yang Lebih Sehat
          </p>
          <Link
            href="/page/daftar-mitra"
            className="inline-block bg-brand-accent text-gray-900 font-bold px-10 py-4 rounded-lg text-body-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Daftar Menjadi Mitra
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
