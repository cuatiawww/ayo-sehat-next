/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Share2, Facebook, Twitter, Link2, Calendar } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import data from '@/data/kegiatan.json'

interface KegiatanDetailProps {
  slug: string
}

export default function KegiatanDetail({ slug }: KegiatanDetailProps) {
  // Find event detail
  const eventDetail = data.eventDetails?.[slug as keyof typeof data.eventDetails]

  if (!eventDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md text-gray-900 mb-4">
            Kegiatan Tidak Ditemukan
          </h1>
          <Link
            href="/kegiatan"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            Kembali ke Kegiatan
          </Link>
        </div>
      </div>
    )
  }

  // Get related articles
  const relatedArticles = data.ongoingEvents
    .concat(data.upcomingEvents)
    .filter(event => event.slug !== slug)
    .slice(0, 4)
    .map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      image: event.image,
      category: [event.status === 'ongoing' ? 'Sedang Berlangsung' : 'Akan Datang'],
      lifecycleStage: [eventDetail.category],
      date: event.displayDate,
      readTime: '5 menit',
      slug: event.slug,
    }))

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(eventDetail.title)

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
    <>
      <div className="min-h-screen bg-white">
        <CustomBreadcrumb
          currentPage={eventDetail.title}
          items={[{ label: 'Kegiatan', href: '/kegiatan' }]}
        />

        {/* Main Content */}
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
                    src={eventDetail.image}
                    alt={eventDetail.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4"
                >
                  <Badge className="bg-brand-primary text-white px-3 py-1">
                    {eventDetail.category}
                  </Badge>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-4"
                >
                  {eventDetail.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 text-body-sm text-gray-600 mb-4"
                >
                  {eventDetail.author && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Ditulis Oleh:</span>
                        <span className="text-brand-primary">
                          {eventDetail.author.name}
                        </span>
                      </div>
                      <span>•</span>
                    </>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{eventDetail.displayDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span>Dilihat {eventDetail.views} Kali</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span>Waktu Baca {eventDetail.readTime} Menit</span>
                  </div>
                </motion.div>

                {/* Tags */}
                {eventDetail.tags && eventDetail.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200"
                  >
                    {eventDetail.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-brand-primary text-brand-primary px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </motion.div>
                )}

                {/* Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex gap-2 mb-8 pb-6 border-b border-gray-200"
                >
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  >
                    <Facebook size={16} />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  >
                    <Twitter size={16} />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  >
                    <Link2 size={16} />
                  </button>
                  <button
                    onClick={() => handleShare('share')}
                    className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                  >
                    <Share2 size={16} />
                  </button>
                </motion.div>

                {/* Content - DYNAMIC */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="prose prose-lg max-w-none"
                >
                  {/* Intro */}
                  {eventDetail.fullContent?.intro && (
                    <p className="text-body-lg text-gray-700 leading-relaxed mb-6">
                      {eventDetail.fullContent.intro}
                    </p>
                  )}

                  {/* Sections */}
                  <div className="space-y-6 text-body-md lg:text-body-lg text-gray-700 leading-relaxed">
                    {eventDetail.fullContent?.sections?.map((section, index) => {
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
                        return <p key={index}>{section.content}</p>
                      }
                      if (section.type === 'list') {
                        return (
                          <ul key={index} className="list-disc list-inside space-y-2 pl-4">
                            {section.items?.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        )
                      }
                      return null
                    })}
                  </div>
                </motion.div>

                {/* Topik Kesehatan Terkait */}
                {eventDetail.fullContent?.topikKesehatanTerkait &&
                  eventDetail.fullContent.topikKesehatanTerkait.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-12 pt-8 border-t border-gray-200"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Topik Kesehatan Terkait
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {eventDetail.fullContent.topikKesehatanTerkait.map(
                          (topic, index) => (
                            <Link
                              key={index}
                              href="#"
                              className="bg-white border-2 border-brand-primary rounded-xl p-4 text-center hover:bg-brand-primary hover:text-white transition-all group"
                            >
                              <span className="text-body-md font-semibold text-brand-primary group-hover:text-white">
                                {topic}
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                {/* Penyakit Terkait */}
                {eventDetail.fullContent?.penyakitTerkait &&
                  eventDetail.fullContent.penyakitTerkait.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="mt-12"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Penyakit Terkait
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {eventDetail.fullContent.penyakitTerkait.map((disease, index) => (
                          <Link
                            key={index}
                            href="#"
                            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-brand-primary hover:shadow-md transition-all"
                          >
                            <span className="text-body-md font-semibold text-gray-900">
                              {disease}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
                {/* Ringkasan Info */}
                {/* {eventDetail.ringkasanInfo && (
                  <div className="bg-brand-primary/5 rounded-xl p-6 border border-brand-primary/20">
                    <h3 className="text-body-lg font-bold text-brand-primary mb-4">
                      {eventDetail.ringkasanInfo.title}
                    </h3>
                    <ul className="space-y-2">
                      {eventDetail.ringkasanInfo.items.map((item, index) => (
                        <li key={index} className="text-body-sm text-brand-primary">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                {/* Kemitraan Card */}
                {eventDetail.fullContent?.kemitraan && (
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="relative h-[150px]">
                      <img
                        src={eventDetail.fullContent.kemitraan.image}
                        alt={eventDetail.fullContent.kemitraan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-3">
                        {eventDetail.fullContent.kemitraan.title}
                      </h3>
                      <p className="text-body-sm text-gray-600 mb-4 line-clamp-3">
                        {eventDetail.fullContent.kemitraan.description}
                      </p>
                      <Button
                        asChild
                        className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white"
                      >
                        <Link href={eventDetail.fullContent.kemitraan.buttonLink}>
                          {eventDetail.fullContent.kemitraan.buttonText}
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Sidebar Components */}
                <RightSidebar
                  showCalendar={true}
                  showRelatedArticles={relatedArticles.length > 0}
                  showCampaigns={true}
                  showPublications={true}
                  relatedArticles={relatedArticles}
                  viewMoreLinks={{
                    articles: '/kegiatan',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}