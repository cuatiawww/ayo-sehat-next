'use client'

import CustomBreadcrumb from '@/components/CustomBreadcrump'
import HeroSection from '@/components/kemitraan/HeroSection'
import CampaignSlider from '@/components/kemitraan/CampaignSlider'
import MitraInfoSection from '@/components/kemitraan/MitraInfoSection'
import BenefitsSection from '@/components/kemitraan/BenefitsSection'
import PartnersSection from '@/components/kemitraan/PartnersSection'
import CTASection from '@/components/kemitraan/CTASection'
import FAQSection from '@/components/kemitraan/FAQSection'

export default function KemitraanClient() {
  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Kemitraan Kesehatan',
    description:
      'Kolaborasi antara pemerintah, masyarakat, dan mitra strategis untuk meningkatkan program kesehatan yang lebih inklusif, inovatif, dan berkelanjutan.',
    url: 'https://staging-ayo-sehat-v2.vercel.app/kemitraan',
    mainEntity: {
      '@type': 'Organization',
      name: 'Kementerian Kesehatan Republik Indonesia',
      url: 'http://localhost:3000',
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
        <CustomBreadcrumb currentPage="Kemitraan" />

        {/* Hero Section */}
        <HeroSection />

        {/* Campaign Slider */}
        <CampaignSlider />

        {/* Mitra Info Section */}
        <MitraInfoSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Partners Section */}
        <PartnersSection />

        {/* CTA Section */}
        <CTASection />

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </>
  )
}
