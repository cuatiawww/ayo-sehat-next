/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Share2, Facebook, Twitter, Link2, Calendar, Eye, Clock } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { Badge } from '@/components/ui/badge'
import data from '@/data/artikel.json'

interface ArtikelDetailProps {
  slug: string
}

export default function ArtikelDetail({ slug }: ArtikelDetailProps) {
  // Find the article
  const article = data.articles.find((item) => item.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md text-gray-900 mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <Link
            href="/artikel"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    )
  }

  // Get related articles (same lifecycle stage or category)
  const relatedArticles = data.articles
    .filter(
      (item) =>
        item.id !== article.id &&
        (item.lifecycleStage === article.lifecycleStage ||
          item.category === article.category)
    )
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.excerpt,
      image: item.image,
      category: [item.category],
      lifecycleStage: [item.lifecycleStage],
      date: item.date,
      readTime: item.readTime + ' menit',
      slug: item.slug,
    }))

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(article.title)

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
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Kemenkes Ayo Sehat',
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
          currentPage={article.title}
          items={[
            { label: 'Siklus Hidup', href: '/siklus-hidup' },
            { label: article.lifecycleStage, href: '#' },
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
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Category Badges - DYNAMIC */}
                {article.tags && article.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    <Badge className="bg-brand-primary text-white px-3 py-1">
                      {article.lifecycleStage}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-brand-primary text-brand-primary px-3 py-1"
                    >
                      {article.category}
                    </Badge>
                    {article.tags.map((tag, index) => (
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

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-4"
                >
                  {article.title}
                </motion.h1>

                {/* Meta Info - DYNAMIC */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 text-body-sm text-gray-600 mb-4"
                >
                  {article.author && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Ditulis Oleh:</span>
                        <span className="text-brand-primary">
                          {article.author.name}
                        </span>
                      </div>
                      <span>•</span>
                    </>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>Dilihat {article.views} Kali</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Waktu Baca {article.readTime} Menit</span>
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

                {/* Article Content - DYNAMIC from fullContent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="prose prose-lg max-w-none"
                >
                  {/* Quote/Highlight - DYNAMIC */}
                  {article.fullContent?.quote && (
                    <div className="bg-gradient-to-r from-brand-primary/10 to-transparent border-l-4 border-brand-primary p-6 mb-8 rounded-r-xl">
                      <p className="text-body-lg italic text-brand-primary font-medium leading-relaxed">
                        {article.fullContent.quote}
                      </p>
                    </div>
                  )}

                  {/* Main Content Sections - FULLY DYNAMIC */}
                  <div className="space-y-6 text-body-md lg:text-body-lg text-gray-700 leading-relaxed">
                    {/* Excerpt as first paragraph */}
                    <p className="text-justify">{article.excerpt}</p>

                    {/* Render all sections dynamically */}
                    {article.fullContent?.sections?.map((section, index) => {
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

                {/* Related Topics - DYNAMIC */}
                {article.fullContent?.relatedTopics &&
                  article.fullContent.relatedTopics.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mt-12 pt-8 border-t border-gray-200"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Topik Kesehatan Terkait
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {article.fullContent.relatedTopics.map((topic, index) => (
                          <Link
                            key={index}
                            href="#"
                            className="bg-white border-2 border-brand-primary rounded-xl p-4 text-center hover:bg-brand-primary hover:text-white transition-all group"
                          >
                            <span className="text-body-md font-semibold text-brand-primary group-hover:text-white">
                              {topic}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}

                {/* Related Diseases - DYNAMIC */}
                {article.fullContent?.relatedDiseases &&
                  article.fullContent.relatedDiseases.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-12"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Penyakit Terkait
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {article.fullContent.relatedDiseases.map(
                          (disease, index) => (
                            <Link
                              key={index}
                              href="#"
                              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-brand-primary hover:shadow-md transition-all"
                            >
                              <span className="text-body-md font-semibold text-gray-900">
                                {disease}
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                {/* References - DYNAMIC */}
                {article.fullContent?.references &&
                  article.fullContent.references.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="mt-12 bg-gray-50 rounded-xl p-6"
                    >
                      <h3 className="text-heading-sm font-bold text-brand-primary mb-4">
                        Tautan Referensi
                      </h3>
                      <ul className="space-y-2 text-body-sm">
                        {article.fullContent.references.map((ref, index) => (
                          <li key={index}>
                            <a
                              href="#"
                              className="text-brand-primary hover:underline"
                            >
                              • {ref}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <RightSidebar
                  showCalendar={true}
                  showRelatedArticles={relatedArticles.length > 0}
                  showCampaigns={true}
                  showPublications={true}
                  relatedArticles={relatedArticles}
                  viewMoreLinks={{
                    articles: '/artikel',
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