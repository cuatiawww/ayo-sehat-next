'use client'

import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import CampaignSection from '@/components/kampanye/CampaignSection'
import data from '@/data/kampanye.json'

// TYPE CAMPAIGN
interface Campaign {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category: string   
}

// KELUARKAN DATA + ASSERTION
const { priorityCampaigns, healthCampaigns } = data as {
  priorityCampaigns: Campaign[]
  healthCampaigns: Campaign[]
}

export default function KampanyeClient() {
  // JSON-LD
  const allCampaigns = [...priorityCampaigns, ...healthCampaigns]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kampanye Ayo Sehat',
    description:
      'Kampanye dan peringatan hari besar kesehatan yang diselenggarakan oleh Kementerian Kesehatan.',
    url: 'http://localhost:3000/kampanye',
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
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Kampanye" />

        {/* HERO */}
        <section className="relative bg-brand-gradient py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-white/5 blur-3xl" />
          </div>

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
              <p className="text-body-md sm:text-body-lg lg:text-heading-sm leading-relaxed text-white/90">
                Kegiatan dan peringatan hari besar kesehatan yang diselenggarakan oleh Kementerian Kesehatan dan mitra terkait. Melalui agenda ini, masyarakat diajak berpartisipasi aktif dalam berbagai kampanye, edukasi, dan aksi nyata untuk mewujudkan Indonesia yang lebih sehat, tangguh, dan sejahtera.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              
              {/* LEFT: Campaign Sections */}
              <div>
                <CampaignSection
                  title="Kampanye Prioritas"
                  description="Kampanye Prioritas berfokus pada isu-isu kesehatan utama yang menjadi perhatian nasional, seperti imunisasi, gizi seimbang, dan penanggulangan penyakit menular. Mari bersama wujudkan Indonesia yang lebih sehat melalui langkah nyata dan kolaborasi semua pihak."
                  campaigns={priorityCampaigns}
                />

                <CampaignSection
                  title="Kampanye Kesehatan"
                  description="Dapatkan informasi dan materi edukatif dari berbagai kampanye kesehatan Kementerian Kesehatan. Tingkatkan pengetahuan, ubah perilaku, dan jadikan gaya hidup sehat sebagai bagian dari keseharian Anda."
                  campaigns={healthCampaigns}
                />
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
