/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'

const partners = [
  {
    id: 1,
    name: 'Takeda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Takeda_Pharmaceutical_Company_logo.svg/320px-Takeda_Pharmaceutical_Company_logo.svg.png',
  },
  {
    id: 2,
    name: 'Novartis',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Novartis-Logo.svg/320px-Novartis-Logo.svg.png',
  },
  {
    id: 3,
    name: 'Pfizer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Pfizer_logo.svg/320px-Pfizer_logo.svg.png',
  },
  {
    id: 4,
    name: 'Kalbe Farma',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/3/3c/Kalbe_farma_logo.svg/320px-Kalbe_farma_logo.svg.png',
  },
  {
    id: 5,
    name: 'Adaro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Adaro_Energy_logo.svg/320px-Adaro_Energy_logo.svg.png',
  },
  {
    id: 6,
    name: 'Sanofi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sanofi.svg/320px-Sanofi.svg.png',
  },
  {
    id: 7,
    name: 'Unilever',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Unilever_logo.svg/320px-Unilever_logo.svg.png',
  },
  {
    id: 8,
    name: 'KAO',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kao_Corporation_logo.svg/320px-Kao_Corporation_logo.svg.png',
  },
]

export default function PartnersSection() {
  return (
    <section className="bg-gray-50 section-padding-lg border-t border-gray-100">
      <div className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold">
            Mitra Kami
          </h2>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative w-full h-20 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
