/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import data from '@/data/perilaku-hidup-sehat.json'

const { healthyBehaviors } = data

export default function PerilakuHidupSehatClient() {
  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Perilaku Hidup Sehat',
    description:
      'Panduan lengkap perilaku hidup sehat untuk mencegah penyakit dan meningkatkan kualitas hidup.',
    url: 'https://staging-ayo-sehat-v2.vercel.app/page/perilaku-hidup-sehat',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: healthyBehaviors.length,
      itemListElement: healthyBehaviors.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: item.title,
          description: item.description,
          image: item.image,
        },
      })),
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Perilaku Hidup Sehat" />

        {/* HERO */}
        <section className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark py-12 sm:py-16 lg:py-24 overflow-hidden">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg leading-tight text-white mb-4 sm:mb-6">
                Perilaku Hidup Sehat
              </h1>
              <p className="text-body-md sm:text-body-lg text-white/90 leading-relaxed">
                Perilaku hidup sehat adalah pola kebiasaan sehari-hari yang kita pilih untuk menjaga dan meningkatkan kualitas kesehatan fisik, mental, dan sosial. Mulai dari makan makanan bergizi seimbang, berolahraga secara teratur minimal 30 menit setiap hari, tidur cukup 7–8 jam per malam, hingga mengelola stres dengan baik dan menghindari rokok serta alkohol berlebihan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT: Content Grid */}
              <div>
                {/* Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                  {healthyBehaviors.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/page/perilaku-hidup-sehat/${item.slug}`}
                        className="block group h-full"
                      >
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          {/* Image */}
                          <div className="relative h-[180px] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col relative">
                            {/* Title */}
                            <h3 className="text-body-md sm:text-body-lg font-bold text-brand-primary mb-2 line-clamp-2 pr-10 group-hover:text-brand-primary-dark transition-colors">
                              {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-body-sm text-gray-600 leading-relaxed line-clamp-2 pr-10 flex-1">
                              {item.description}
                            </p>

                            {/* Arrow Icon - Positioned absolute */}
                            <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-md">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* RIGHT: Sidebar */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <RightSidebar
                  showCalendar={true}
                  showCampaigns={true}
                  showPublications={true}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}