/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Share2, Facebook, Twitter, Link2 } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { Badge } from '@/components/ui/badge'
import data from '@/data/topik-kesehatan.json'

interface TopikDetailProps {
  slug: string
}

export default function TopikKesehatanDetail({ slug }: TopikDetailProps) {
  // Find the topic detail
  const topicDetail = data.topicDetails?.[slug as keyof typeof data.topicDetails]

  if (!topicDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md text-gray-900 mb-4">
            Topik Tidak Ditemukan
          </h1>
          <Link
            href="/page/topik-kesehatan"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            Kembali ke Topik Kesehatan
          </Link>
        </div>
      </div>
    )
  }

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(topicDetail.title)

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

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topicDetail.title,
    image: topicDetail.image,
    author: {
      '@type': 'Organization',
      name: 'Kementerian Kesehatan RI',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ayo Sehat Kemenkes',
      logo: {
        '@type': 'ImageObject',
        url: 'https://staging-ayo-sehat-v2.vercel.app/logo-kemenkes.png',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb
          currentPage={topicDetail.title}
          items={[
            { label: 'Topik Kesehatan', href: '/page/topik-kesehatan' },
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
                    src={topicDetail.image}
                    alt={topicDetail.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Category Badges - DYNAMIC */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  <Badge className="bg-brand-primary text-white px-3 py-1">
                    Topik Kesehatan
                  </Badge>
                  {topicDetail.category?.map((cat, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-brand-primary text-brand-primary px-3 py-1"
                    >
                      {cat}
                    </Badge>
                  ))}
                  {topicDetail.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-brand-primary text-brand-primary px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-6"
                >
                  {topicDetail.title}
                </motion.h1>

                {/* Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
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

                {/* Article Content - DYNAMIC from fullContent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="prose prose-lg max-w-none"
                >
                  {/* Main Content Sections - FULLY DYNAMIC */}
                  <div className="space-y-6 text-body-md lg:text-body-lg text-gray-700 leading-relaxed">
                    {/* Render all sections dynamically */}
                    {topicDetail.fullContent?.sections?.map((section, index) => {
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
                      return null
                    })}
                  </div>
                </motion.div>

                {/* Topik Kesehatan Terkait - DYNAMIC */}
                {topicDetail.fullContent?.topikKesehatanTerkait &&
                  topicDetail.fullContent.topikKesehatanTerkait.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="mt-12 pt-8 border-t border-gray-200"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Topik Kesehatan Terkait
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {topicDetail.fullContent.topikKesehatanTerkait.map(
                          (topic, index) => {
                            const slug = topic
                              .toLowerCase()
                              .replace(/\s+/g, '-')
                              .replace(/[^a-z0-9-]/g, '')
                            return (
                              <Link
                                key={index}
                                href={`/page/topik-kesehatan/${slug}`}
                                className="bg-white border-2 border-brand-primary rounded-xl p-4 text-center hover:bg-brand-primary hover:text-white transition-all group"
                              >
                                <span className="text-body-md font-semibold text-brand-primary group-hover:text-white">
                                  {topic}
                                </span>
                              </Link>
                            )
                          }
                        )}
                      </div>
                    </motion.div>
                  )}

                {/* Penyakit Terkait - DYNAMIC */}
                {topicDetail.fullContent?.penyakitTerkait &&
                  topicDetail.fullContent.penyakitTerkait.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mt-12"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Penyakit Terkait
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {topicDetail.fullContent.penyakitTerkait.map(
                          (disease, index) => {
                            const slug = disease
                              .toLowerCase()
                              .replace(/\s+/g, '-')
                              .replace(/[^a-z0-9-]/g, '')
                            return (
                              <Link
                                key={index}
                                href={`/page/topik-kesehatan/${slug}`}
                                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-brand-primary hover:shadow-md transition-all"
                              >
                                <span className="text-body-md font-semibold text-gray-900">
                                  {disease}
                                </span>
                              </Link>
                            )
                          }
                        )}
                      </div>
                    </motion.div>
                  )}

                {/* References - DYNAMIC */}
                {topicDetail.fullContent?.references &&
                  topicDetail.fullContent.references.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-12 bg-gray-50 rounded-xl p-6"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Referensi
                      </h3>
                      <ul className="space-y-2 text-body-sm">
                        {topicDetail.fullContent.references.map((ref, index) => (
                          <li key={index}>
                            <span className="text-gray-700">• {ref}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                {/* Ringkasan Info */}
                {topicDetail.ringkasanInfo && (
                  <div className="bg-brand-primary/5 rounded-xl p-6 mb-6 border border-brand-primary/20">
                    <h3 className="text-body-lg font-bold text-brand-primary mb-4">
                      {topicDetail.ringkasanInfo.title}
                    </h3>
                    <ul className="space-y-2">
                      {topicDetail.ringkasanInfo.items.map((item, index) => (
                        <li key={index}>
                          <a
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-body-sm text-brand-primary hover:text-brand-primary-dark transition-colors"
                          >
                            • {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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