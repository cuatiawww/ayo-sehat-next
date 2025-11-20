/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Share2, Facebook, Twitter, Link2, Calendar, MapPin, Users } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { Badge } from '@/components/ui/badge'
import data from '@/data/kampanye.json'

interface KampanyeDetailProps {
  slug: string
}

// Dummy content yang akan digunakan untuk semua kampanye
const dummyContent = {
  date: '15 Januari 2025',
  location: 'Seluruh Indonesia',
  participants: '50.000+ Peserta',
  organizer: 'Kementerian Kesehatan RI',
  intro: 'Kampanye kesehatan ini merupakan bagian dari upaya pemerintah dalam meningkatkan kesadaran masyarakat akan pentingnya menjaga kesehatan. Melalui berbagai kegiatan edukatif dan interaktif, kami mengajak seluruh lapisan masyarakat untuk berpartisipasi aktif dalam menciptakan Indonesia yang lebih sehat.',
  sections: [
    {
      type: 'heading',
      content: 'Latar Belakang Program'
    },
    {
      type: 'paragraph',
      content: 'Program ini diluncurkan sebagai respons terhadap tantangan kesehatan masyarakat Indonesia yang semakin kompleks. Dengan meningkatnya angka penyakit tidak menular dan masalah kesehatan lainnya, diperlukan pendekatan komprehensif yang melibatkan partisipasi aktif dari seluruh elemen masyarakat.'
    },
    {
      type: 'heading',
      content: 'Tujuan Kampanye'
    },
    {
      type: 'paragraph',
      content: 'Kampanye ini bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya pola hidup sehat, mendorong perubahan perilaku menuju gaya hidup yang lebih sehat, serta memfasilitasi akses masyarakat terhadap informasi dan layanan kesehatan yang berkualitas. Kami percaya bahwa dengan edukasi yang tepat dan dukungan yang memadai, setiap individu dapat mengambil langkah proaktif untuk menjaga kesehatan mereka dan keluarga.'
    },
    {
      type: 'heading',
      content: 'Kegiatan Utama'
    },
    {
      type: 'paragraph',
      content: 'Berbagai kegiatan menarik telah disiapkan untuk mendukung tujuan kampanye ini. Mulai dari seminar kesehatan, pemeriksaan kesehatan gratis, hingga workshop tentang pola makan sehat dan olahraga. Kami juga menyediakan konsultasi gratis dengan tenaga kesehatan profesional yang siap membantu menjawab pertanyaan dan memberikan saran kesehatan yang tepat sesuai kebutuhan masing-masing individu.'
    },
    {
      type: 'heading',
      content: 'Cara Berpartisipasi'
    },
    {
      type: 'paragraph',
      content: 'Masyarakat dapat berpartisipasi dalam kampanye ini melalui berbagai cara. Anda dapat mengikuti kegiatan-kegiatan yang diadakan di wilayah Anda, mendaftar sebagai relawan, atau bahkan menjadi agen perubahan di komunitas Anda. Setiap kontribusi, sekecil apapun, sangat berarti dalam mewujudkan Indonesia yang lebih sehat.'
    },
    {
      type: 'heading',
      content: 'Target dan Harapan'
    },
    {
      type: 'paragraph',
      content: 'Kami menargetkan untuk menjangkau jutaan masyarakat Indonesia melalui kampanye ini. Harapan kami adalah terjadinya perubahan signifikan dalam pola hidup masyarakat, meningkatnya angka partisipasi dalam program kesehatan preventif, dan terciptanya komunitas-komunitas sehat di seluruh nusantara. Bersama-sama, kita dapat mewujudkan Indonesia yang lebih sehat dan produktif.'
    }
  ],
  benefits: [
    'Meningkatkan kesadaran kesehatan masyarakat',
    'Akses gratis ke pemeriksaan kesehatan',
    'Edukasi pola hidup sehat dari ahli',
    'Networking dengan komunitas kesehatan',
    'Mendapat materi edukatif berkualitas'
  ],
  timeline: [
    { phase: 'Fase 1', period: 'Januari - Maret 2025', activity: 'Sosialisasi dan edukasi awal' },
    { phase: 'Fase 2', period: 'April - Juni 2025', activity: 'Implementasi program di berbagai daerah' },
    { phase: 'Fase 3', period: 'Juli - September 2025', activity: 'Evaluasi dan pengembangan program' },
    { phase: 'Fase 4', period: 'Oktober - Desember 2025', activity: 'Pelaporan dan perencanaan lanjutan' }
  ]
}

export default function KampanyeDetailClient({ slug }: KampanyeDetailProps) {
  // Find the campaign
  const allCampaigns = [
    ...data.priorityCampaigns,
    ...data.healthCampaigns
  ]
  const campaign = allCampaigns.find((item) => item.slug === slug)

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md text-gray-900 mb-4">
            Kampanye Tidak Ditemukan
          </h1>
          <Link
            href="/kampanye"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            Kembali ke Kampanye
          </Link>
        </div>
      </div>
    )
  }

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(campaign.title)

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(window.location.href)
        alert('Link berhasil disalin!')
        break
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <CustomBreadcrumb
        currentPage={campaign.title}
        items={[
          { label: 'Kampanye', href: '/kampanye' },
          { label: campaign.category === 'prioritas' ? 'Kampanye Prioritas' : 'Kampanye Kesehatan', href: '#' },
        ]}
      />

      {/* Main Content with Grid */}
      <section className="section-padding-lg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
            {/* LEFT CONTENT */}
            <div>
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-6"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                <Badge className="bg-brand-primary text-white px-3 py-1">
                  {campaign.category === 'prioritas' ? 'Kampanye Prioritas' : 'Kampanye Kesehatan'}
                </Badge>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-4"
              >
                {campaign.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 text-body-sm text-gray-600 mb-4"
              >
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{dummyContent.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{dummyContent.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{dummyContent.participants}</span>
                </div>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex gap-2 mb-8 pb-6 border-b border-gray-200"
              >
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  aria-label="Share to Facebook"
                >
                  <Facebook size={16} />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  aria-label="Share to Twitter"
                >
                  <Twitter size={16} />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  aria-label="Copy Link"
                >
                  <Link2 size={16} />
                </button>
                <button
                  onClick={() => handleShare('share')}
                  className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  aria-label="Share"
                >
                  <Share2 size={16} />
                </button>
              </motion.div>

              {/* Campaign Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                {/* Intro */}
                <div className="bg-gradient-to-r from-brand-primary/10 to-transparent border-l-4 border-brand-primary p-6 mb-8 rounded-r-xl">
                  <p className="text-body-lg text-brand-primary font-medium leading-relaxed">
                    Penyelenggara: {dummyContent.organizer}
                  </p>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-6 text-body-md lg:text-body-lg text-gray-700 leading-relaxed">
                  <p className="text-justify">{dummyContent.intro}</p>

                  {dummyContent.sections.map((section, index) => {
                    if (section.type === 'heading') {
                      return (
                        <h2
                          key={index}
                          className="text-heading-md text-brand-primary font-bold mt-8 mb-4"
                        >
                          {section.content}
                        </h2>
                      )
                    }
                    if (section.type === 'paragraph') {
                      return <p key={index} className="text-justify">{section.content}</p>
                    }
                    return null
                  })}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-2xl p-6"
              >
                <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                  Manfaat Mengikuti Kampanye
                </h3>
                <ul className="space-y-3">
                  {dummyContent.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0" />
                      <span className="text-body-md text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12"
              >
                <h3 className="text-heading-sm font-bold text-brand-primary mb-6">
                  Timeline Pelaksanaan
                </h3>
                <div className="space-y-4">
                  {dummyContent.timeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-brand-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                          <span className="text-brand-primary font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-brand-primary mb-1">{item.phase}</h4>
                        <p className="text-body-sm text-gray-600 mb-2">{item.period}</p>
                        <p className="text-body-sm text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-12 text-center p-8 bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-2xl"
              >
                <h3 className="text-heading-md font-bold text-white mb-4">
                  Tertarik Bergabung?
                </h3>
                <p className="text-body-lg text-white/90 mb-6">
                  Daftarkan diri Anda dan jadilah bagian dari perubahan menuju Indonesia yang lebih sehat!
                </p>
                <button className="bg-white text-brand-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Daftar Sekarang
                </button>
              </motion.div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <RightSidebar
                showCalendar={true}
                showRelatedArticles={false}
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
