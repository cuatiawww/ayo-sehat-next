/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'

export default function TentangClient() {
  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Tentang Ayo Sehat',
    description:
      'Ayo Sehat merupakan wadah penyediaan platform terbaik dalam upaya informasi, edukasi kesehatan, serta gaya hidup sehat bagi kami dari Kementerian Kesehatan sebagai bagian dari program pemerintah.',
    url: 'https://staging-ayo-sehat-v2.vercel.app/tentang',
    mainEntity: {
      '@type': 'Organization',
      name: 'Kementerian Kesehatan Republik Indonesia',
      alternateName: 'Kemenkes RI',
      url: 'https://staging-ayo-sehat-v2.vercel.app',
      logo: 'https://staging-ayo-sehat-v2.vercel.app/logo-kemenkes.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jl. H.R. Rasuna Said Blok X-5, Kav. 4-9',
        addressLocality: 'Jakarta Selatan',
        postalCode: '12950',
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID',
      },
    },
  }

  const ogImage =
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Tentang" />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-12 lg:py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl lg:max-w-2xl"
            >
              <h1 className="text-heading-lg sm:text-display-sm lg:text-display-md font-bold mb-4">
                Ayo Sehat
              </h1>
              <p className="text-heading-sm sm:text-heading-md lg:text-heading-lg font-medium mb-2">
                Kementerian Kesehatan
              </p>
              <p className="text-heading-sm sm:text-heading-md lg:text-heading-lg font-medium">
                Republik Indonesia
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Content Section - Dengan Image Overlap */}
        <section className="relative bg-white section-padding-lg">
          <div className="container-custom">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                {/* Tentang Title */}
                <h2 className="text-heading-md sm:text-heading-lg lg:text-heading-xl font-bold text-brand-primary mb-6">
                  Tentang
                </h2>

                {/* Paragraphs */}
                <div className="space-y-6 text-body-md sm:text-body-lg text-gray-700 leading-relaxed text-justify">
                  <p>
                    Ayo Sehat merupakan wadah penyediaan platform terbaik dalam
                    upaya informasi, edukasi kesehatan, serta gaya hidup sehat
                    bagi kami dari Kementerian Kesehatan sebagai bagian dari
                    program pemerintah yang bertanggung jawab dan informasi yang
                    diberikan sejalan dengan program pemerintah.
                  </p>

                  <p>
                    @ayosehat-kemkes hadir agar masyarakat dapat mengakses
                    langsung informasi dan edukasi kesehatan yang dibagikan dari
                    sumber resmi dan terpercaya.
                  </p>

                  <p>
                    Konten yang ada di Ayo Sehat adalah hasil peliharaan dan
                    kolaborasi dengan lintas program pada setiap pencegahan dan
                    produktivitas.
                  </p>

                  <p>
                    Ayo Sehat juga dapat menjadi wadah berbagi informasi tentang
                    kegiatan seputar kesehatan yang dilaksanakan program hingga
                    mitra yang dapat diikuti masyarakat.
                  </p>
                </div>
              </motion.div>

              {/* Overlapping Image - Absolute Position */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:block absolute right-0 top-[-120px] z-10"
                style={{ width: '500px' }}
              >
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={ogImage}
                    alt="Tim Ayo Sehat Kemenkes"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}