/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MitraInfoSection() {
  const infoImage =
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'

  return (
    <section className="bg-gray-50 section-padding-lg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-6">
              Mitra Kementerian Kesehatan
            </h2>
            <div className="space-y-4 text-body-md sm:text-body-lg text-gray-700 leading-relaxed mb-8">
              <p>
                Kemitraan merupakan wadah kolaborasi kesehatan tidak terbatas
                dari kerjasama dan dukungan berbagai lintas sektor, dunia usaha,
                organisasi kemasyarakatan, institusi pendidikan serta media. Di
                sisi lain, Kementerian sudah berkepanjangan pada komitmen yang
                mantap dalam mendukung peningkatan kesehatan dan kualitas hidup
                untuk menghasilkan sinergi dan upaya yang berkelanjutan untuk
                mewujudkan program kesehatan yang inovatif dan berdampak
                masyarakat yang berberlaku sehat!
              </p>
            </div>

            <Link
              href="#daftar-mitra"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Daftar Menjadi Mitra
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={infoImage}
                alt="Kemitraan Kesehatan"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
