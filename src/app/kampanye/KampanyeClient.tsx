'use client'

import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import CampaignSection from '@/components/kampanye/CampaignSection'
import data from '@/data/kampanye.json'

import type { Campaign } from '@/types/campaign'

const { priorityCampaigns, healthCampaigns } = data as {
  priorityCampaigns: Campaign[]
  healthCampaigns: Campaign[]
}

export default function KampanyeClient() {
  const allCampaigns = [...priorityCampaigns, ...healthCampaigns]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kampanye Ayo Sehat',
    description: 'Kampanye dan peringatan hari besar kesehatan...',
    url: 'https://ayosehat.com/kampanye', 
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allCampaigns.length,
      itemListElement: allCampaigns.map((campaign, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: campaign.title,
          description: campaign.description,
          image: campaign.image,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Kampanye" />

        {/* HERO */}
        <section className="relative bg-brand-gradient py-12 sm:py-16 lg:py-20 overflow-hidden">
          {/* ... hero section tetap sama ... */}
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg leading-tight text-white mb-4 sm:mb-6">
                Kampanye Ayo Sehat
              </h1>
              <p className="text-body-md sm:text-body-lg  text-white/90">
                Kegiatan dan peringatan hari besar kesehatan yang diselenggarakan oleh Kementerian Kesehatan dan mitra terkait. Melalui agenda ini, masyarakat diajak berpartisipasi aktif dalam berbagai kampanye, edukasi, dan aksi nyata untuk mewujudkan Indonesia yang lebih sehat, tangguh, dan sejahtera.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              <div>
                <CampaignSection
                  title="Kampanye Prioritas"
                  description="Kampanye Prioritas berfokus pada isu-isu kesehatan utama..."
                  campaigns={priorityCampaigns}
                />

                <CampaignSection
                  title="Kampanye Kesehatan"
                  description="Dapatkan informasi dan materi edukatif..."
                  campaigns={healthCampaigns}
                />
              </div>

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
