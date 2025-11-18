'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, Heart, Award } from 'lucide-react'

const benefits = [
  {
    id: 1,
    icon: Users,
    title: 'Pembangunan kesehatan merupakan tanggung jawab bersama',
  },
  {
    id: 2,
    icon: TrendingUp,
    title:
      'Peningkatan kepedulian dan masyarakat dalam bidang kesehatan, khususnya bersifat promotif dan preventif',
  },
  {
    id: 3,
    icon: Heart,
    title:
      'Kesehatan merupakan modal dasar bagi keberhasilan pembangunan sektor lain',
  },
  {
    id: 4,
    icon: Award,
    title: 'Adanya peluang sumber daya dan mitra potensial',
  },
]

export default function BenefitsSection() {
  return (
    <section className="bg-white section-padding-lg">
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
            Mengapa Bermitra di Bidang Kesehatan?
          </h2>
        </motion.div>

        {/* Benefits Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Card with white background */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary/30 cursor-pointer">
                  <div className="flex items-start gap-5">
                    {/* Icon Box - Teal gradient */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md group-hover:shadow-xl">
                      <Icon
                        className="w-8 h-8 text-white"
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 pt-1">
                      <p className="text-body-sm sm:text-body-md text-gray-700 leading-relaxed transition-colors duration-300 group-hover:text-brand-primary">
                        {benefit.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}