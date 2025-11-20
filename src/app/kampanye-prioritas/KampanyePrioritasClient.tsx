'use client'

import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import CampaignSection from '@/components/kampanye/CampaignSection'
import data from '@/data/kampanye.json'

import type { Campaign } from '@/types/campaign'

const { priorityCampaigns } = data as {
  priorityCampaigns: Campaign[]
}

export default function KampanyePrioritasClient() {
  return (
    <div className="min-h-screen bg-white">
      <CustomBreadcrumb
        currentPage="Kampanye Prioritas"
        items={[
          { label: 'Kampanye', href: '/kampanye' }
        ]}
      />

      {/* HERO */}
      <section className="relative bg-brand-gradient py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg leading-tight text-white mb-4 sm:mb-6">
              Kampanye Prioritas
            </h1>
            <p className="text-body-md sm:text-body-lg text-white/90">
              Kampanye Prioritas berfokus pada isu-isu kesehatan utama yang menjadi perhatian Kementerian Kesehatan RI. Program-program ini dirancang untuk memberikan dampak maksimal bagi kesehatan masyarakat Indonesia melalui pendekatan yang terukur dan berkelanjutan.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>

      <section className="section-padding-lg bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
            <div>
              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-brand-primary/10 to-transparent border-l-4 border-brand-primary p-6 mb-8 rounded-r-xl"
              >
                <h2 className="text-heading-md font-bold text-brand-primary mb-3">
                  Tentang Kampanye Prioritas
                </h2>
                <p className="text-body-md text-gray-700 leading-relaxed text-justify">
                  Kampanye Prioritas merupakan inisiatif strategis Kementerian Kesehatan RI yang dirancang untuk mengatasi tantangan kesehatan terbesar di Indonesia. Setiap kampanye dipilih berdasarkan data epidemiologi terkini dan disesuaikan dengan kebutuhan masyarakat untuk menciptakan perubahan yang signifikan dan berkelanjutan.
                </p>
              </motion.div>

              <CampaignSection
                title="Daftar Kampanye Prioritas"
                description="Berbagai program kampanye kesehatan yang menjadi fokus utama Kementerian Kesehatan RI untuk meningkatkan kualitas hidup masyarakat Indonesia."
                campaigns={priorityCampaigns}
              />
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
              <RightSidebar
                showCalendar={true}
                showCampaigns={true}
                showPublications={true}
                viewMoreLinks={{
                  campaigns: '/kampanye',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
