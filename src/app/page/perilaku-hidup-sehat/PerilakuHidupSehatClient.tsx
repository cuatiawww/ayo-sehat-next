'use client'

import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import HealthyLifestyleGrid from '@/components/healthy-lifestyle/HealthyLifestyleGrid'
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
    url: 'http://localhost:3000/perilaku-hidup-sehat',
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
        <section className="relative bg-brand-gradient py-12 sm:py-16 lg:py-24 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-white/5 blur-3xl" />
          </div>

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
              <p className="text-body-md sm:text-body-lg lg:text-heading-sm leading-relaxed text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
                <HealthyLifestyleGrid items={healthyBehaviors} />

                {/* Pagination (if needed in future) */}
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-brand-primary text-white font-medium">
                      1
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-brand-primary transition-colors">
                      2
                    </button>
                    <span className="px-2 text-gray-500">...</span>
                    <span className="text-body-sm text-gray-600">
                      Selanjutnya
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Sidebar */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <RightSidebar
                  showCalendar={true}
                  showRelatedArticles={true}
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