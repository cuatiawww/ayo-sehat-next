/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Share2, Facebook, Twitter, Link2, Calendar, Download, FileText, Eye } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import data from '@/data/media-download.json'

interface MediaDownloadDetailProps {
  slug: string
}

export default function MediaDownloadDetail({ slug }: MediaDownloadDetailProps) {
  // Find media detail
  const mediaDetail = data.mediaDetails?.[slug as keyof typeof data.mediaDetails]

  if (!mediaDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md text-gray-900 mb-4">
            Media Tidak Ditemukan
          </h1>
          <Link
            href="/media-download"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            Kembali ke Media Download
          </Link>
        </div>
      </div>
    )
  }

  // Get related media - properly typed for RightSidebar
  const relatedArticles = (mediaDetail.relatedMedia || [])
    .map(relatedSlug => {
      const item = data.mediaItems.find(m => m.slug === relatedSlug)
      if (!item) return null
      return {
        id: item.id,
        title: item.title,
        description: mediaDetail.description || '',
        image: item.image,
        category: [item.category],
        lifecycleStage: [mediaDetail.category],
        date: item.date,
        readTime: '5 menit',
        slug: item.slug,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(mediaDetail.title)

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

  // Download handler
  const handleDownload = (fileUrl: string, fileName: string) => {
    // In production, this would trigger actual download
    alert(`Downloading: ${fileName}`)
    console.log('Download URL:', fileUrl)
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <CustomBreadcrumb
          currentPage={mediaDetail.title}
          items={[{ label: 'Media Download', href: '/media-download' }]}
        />

        {/* Main Content */}
        <section className="section-padding-lg">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT CONTENT */}
              <div>
                {/* Hero Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-[300px] sm:h-[350px] rounded-3xl overflow-hidden shadow-xl mb-6 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-accent"
                >
                  <img
                    src={mediaDetail.image}
                    alt={mediaDetail.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <h2 className="text-heading-md sm:text-heading-lg lg:text-display-sm text-white font-bold mb-2">
                        Media Download - Kaos Polo
                      </h2>
                      <p className="text-body-md sm:text-body-lg text-white/95">
                        PERINGATAN HARI KESEHATAN NASIONAL KE-61
                      </p>
                      <p className="text-display-md sm:text-display-lg lg:text-display-xl text-white font-bold mt-4">
                        Generasi Sehat<br/>Masa Depan Hebat
                      </p>
                      <p className="text-body-sm sm:text-body-md text-white/90 mt-2">
                        12 November 2025
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4"
                >
                  <Badge className="bg-brand-primary text-white px-3 py-1">
                    {mediaDetail.category}
                  </Badge>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-4"
                >
                  {mediaDetail.title}
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
                    <span>{mediaDetail.displayDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{mediaDetail.views} Kali dilihat</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{mediaDetail.downloads} Kali diunduh</span>
                  </div>
                </motion.div>

                {/* Tags */}
                {mediaDetail.tags && mediaDetail.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200"
                  >
                    {mediaDetail.tags.map((tag, index) => (
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

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="prose prose-lg max-w-none"
                >
                  {/* Intro */}
                  {mediaDetail.fullContent?.intro && (
                    <p className="text-body-lg text-gray-700 leading-relaxed mb-6">
                      {mediaDetail.fullContent.intro}
                    </p>
                  )}

                  {/* Sections */}
                  <div className="space-y-6 text-body-md lg:text-body-lg text-gray-700 leading-relaxed">
                    {mediaDetail.fullContent?.sections?.map((section, index) => {
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
                        const listSection = section as { type: string; items?: string[] }
                        return (
                          <ul key={index} className="list-disc list-inside space-y-2 pl-4">
                            {listSection.items?.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        )
                      }
                      return null
                    })}
                  </div>
                </motion.div>

                {/* Download Files */}
                {mediaDetail.downloadFiles && mediaDetail.downloadFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 pt-8 border-t border-gray-200"
                  >
                    <h3 className="text-heading-sm font-bold text-brand-primary mb-6">
                      Unduh Media
                    </h3>
                    <div className="space-y-4">
                      {mediaDetail.downloadFiles.map((file) => (
                        <div
                          key={file.id}
                          className="bg-white border-2 border-brand-primary/20 rounded-xl p-6 hover:border-brand-primary hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-body-lg font-semibold text-gray-900 mb-1">
                                  {file.title}
                                </h4>
                                <p className="text-body-sm text-gray-600">
                                  {file.format} • {file.size}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleDownload(file.url, file.title)}
                              className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg px-6"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Unduh
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Related Media */}
                {relatedArticles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-12"
                  >
                    <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                      Media Download Terkait
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {relatedArticles.slice(0, 3).map((media, index) => (
                        <Link
                          key={index}
                          href={`/media-download/${media.slug}`}
                          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-primary hover:shadow-md transition-all group"
                        >
                          <div className="relative h-32">
                            <img
                              src={media.image}
                              alt={media.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-body-md font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-primary transition-colors">
                              {media.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
                <RightSidebar
                  showCalendar={true}
                  showCampaigns={true}
                  showRelatedArticles={relatedArticles.length > 0}
                  showPublications={true}
                  relatedArticles={relatedArticles}
                  viewMoreLinks={{
                    articles: '/media-download',
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