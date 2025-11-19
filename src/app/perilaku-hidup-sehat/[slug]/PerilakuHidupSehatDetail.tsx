/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, TrendingUp, Facebook, Twitter, Link2, Share2 } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { Badge } from '@/components/ui/badge'
import data from '@/data/perilaku-hidup-sehat.json'

interface DetailPageProps {
  slug: string
}

export default function PerilakuHidupSehatDetail({ slug }: DetailPageProps) {
  // Find the specific behavior
  const behavior = data.healthyBehaviors.find((item) => item.slug === slug)

  if (!behavior) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md text-gray-900 mb-4">
            Konten Tidak Ditemukan
          </h1>
          <Link
            href="/perilaku-hidup-sehat"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            Kembali ke Perilaku Hidup Sehat
          </Link>
        </div>
      </div>
    )
  }

  const fullContent = behavior.fullContent
  const relatedBehaviors = data.healthyBehaviors
    .filter((item) => item.id !== behavior.id)
    .slice(0, 3)

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(behavior.title)

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
    headline: behavior.title,
    description: behavior.description,
    image: behavior.image,
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
    datePublished: '2025-01-01',
    dateModified: '2025-01-15',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb
          currentPage={behavior.title}
          items={[
            { label: 'Perilaku Hidup Sehat', href: '/perilaku-hidup-sehat' },
          ]}
        />

        {/* Main Content - Grid with Sidebar */}
        <section className="section-padding-lg">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT CONTENT */}
              <div>
                {/* Hero Image - Inside Left Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-6"
                >
                  <img
                    src={behavior.image}
                    alt={behavior.title}
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
                  <Badge className="bg-brand-primary text-white px-4 py-1.5 text-body-sm">
                    {behavior.category}
                  </Badge>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-4"
                >
                  {behavior.title}
                </motion.h1>

                {/* Meta Info & Share */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200"
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-brand-primary text-brand-primary text-tiny">
                      Gizi Seimbang
                    </Badge>
                    <Badge variant="outline" className="border-brand-primary text-brand-primary text-tiny">
                      Id.Pangan
                    </Badge>
                    <Badge variant="outline" className="border-brand-primary text-brand-primary text-tiny">
                      Gaya Hidup Sehat
                    </Badge>
                    <Badge variant="outline" className="border-brand-primary text-brand-primary text-tiny">
                      Pola Makan Sehat
                    </Badge>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-2">
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
                  </div>
                </motion.div>

                {/* Intro */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-10"
                >
                  <p className="text-body-md sm:text-body-lg text-gray-700 leading-relaxed">
                    {fullContent?.intro}
                  </p>
                </motion.div>

                {/* Why Important */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-10"
                >
                  <h2 className="text-heading-md text-brand-primary font-bold mb-4">
                    Apa Itu Gizi Seimbang?
                  </h2>
                  <p className="text-body-md sm:text-body-lg text-gray-700 leading-relaxed">
                    {fullContent?.whyImportant}
                  </p>
                </motion.div>

                {/* Benefits */}
                {fullContent?.benefits && fullContent.benefits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-10"
                  >
                    <h2 className="text-heading-md text-brand-primary font-bold mb-6">
                      Manfaat
                    </h2>
                    <div className="space-y-4">
                      {fullContent.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-brand-primary hover:shadow-md transition-all"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                          <p className="text-body-md text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tips */}
                {fullContent?.tips && fullContent.tips.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-10"
                  >
                    <h2 className="text-heading-md text-brand-primary font-bold mb-6">
                      Tips Praktis
                    </h2>
                    <div className="space-y-4">
                      {fullContent.tips.map((tip, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 bg-gradient-to-r from-brand-accent/20 to-transparent p-4 rounded-xl"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-body-sm">
                            {index + 1}
                          </div>
                          <p className="text-body-md text-gray-700 flex-1">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Stats */}
                {fullContent?.stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mb-10"
                  >
                    <h2 className="text-heading-md text-brand-primary font-bold mb-6">
                      Fakta & Statistik
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {Object.entries(fullContent.stats).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-brand-primary text-white p-6 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                          <TrendingUp className="w-8 h-8 mb-3 relative z-10" />
                          <p className="text-body-sm mb-2 relative z-10">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Gizi Seimbang dan Gaya Hidup Sehat */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mb-10"
                >
                  <h2 className="text-heading-md text-brand-primary font-bold mb-4">
                    Gizi Seimbang dan Gaya Hidup Sehat
                  </h2>
                  <p className="text-body-md text-gray-700 leading-relaxed mb-4">
                    Dengan menerapkan gaya hidup sehat seperti konsumsi makanan bergizi seimbang, aktivitas fisik teratur, dan menghindari rokok serta alkohol, Anda sudah berada di jalur yang tepat untuk mencegah berbagai penyakit kronis dan menjaga tubuh tetap bugar, baik sekarang maupun di masa depan. Gaya hidup sehat bukan hanya soal diet, tetapi komitmen jangka panjang untuk kesejahteraan menyeluruh.
                  </p>
                </motion.div>

                {/* Related Behaviors */}
                {relatedBehaviors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="mt-12 pt-8 border-t border-gray-200"
                  >
                    <h2 className="text-heading-md text-brand-primary font-bold mb-6">
                      Perilaku Hidup Sehat Lainnya
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedBehaviors.map((item) => (
                        <Link
                          key={item.id}
                          href={`/perilaku-hidup-sehat/${item.slug}`}
                          className="group"
                        >
                          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all">
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-body-md font-bold text-brand-primary group-hover:text-brand-primary-dark line-clamp-2">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* RIGHT SIDEBAR */}
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