/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Facebook, Twitter, Link2 } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import LifecycleStageCard from '@/components/siklus-hidup/LifecycleStageCard'
import TopicCarousel from '@/components/siklus-hidup/TopicCarousel'
import DiseaseCarousel from '@/components/siklus-hidup/DiseaseCaraousel'
import { Badge } from '@/components/ui/badge'
import data from '@/data/siklus-hidup.json'

const { lifecycleStages, stageContent, publications, diseases } = data

export default function SiklusHidupClient() {
  const [selectedStage, setSelectedStage] = useState('remaja')
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [currentDiseaseIndex, setCurrentDiseaseIndex] = useState(0)

  const currentContent = stageContent[selectedStage as keyof typeof stageContent]
  const currentStageData = lifecycleStages.find((s) => s.slug === selectedStage)

  const handleStageChange = (slug: string) => {
    setSelectedStage(slug)
    setCurrentTopicIndex(0)
    setCurrentDiseaseIndex(0)
  }

  // Carousel logic
  const topics = (currentContent as any)?.topics || []
  const visibleCount = 3
  const maxTopicIndex = Math.max(0, topics.length - visibleCount)
  const maxDiseaseIndex = Math.max(0, diseases.length - visibleCount)

  // Format related articles untuk RightSidebar
  const formattedRelatedArticles = ((currentContent as any)?.articles || []).map((article: any) => ({
    id: article.id,
    title: article.title,
    description: article.description || '',
    image: article.image,
    lifecycleStage: article.lifecycleStage || [],
    category: article.category || [],
    date: article.date || '',
    readTime: article.readTime || '',
    slug: article.slug || article.id,
  }))

  // Share handlers
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(document.title)

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text} ${url}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(window.location.href)
        alert('Link berhasil disalin!')
        break
      default:
        // Default share API
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: window.location.href,
          }).catch((err) => console.log('Error sharing:', err))
        }
    }
  }

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Siklus Hidup Kesehatan - ${currentStageData?.name}`,
    description: (currentContent as any)?.description,
    url: 'https://staging-ayo-sehat-v2.vercel.app/siklus-hidup',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: 'https://staging-ayo-sehat-v2.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Siklus Hidup',
          item: 'https://staging-ayo-sehat-v2.vercel.app/siklus-hidup',
        },
      ],
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
        <CustomBreadcrumb
          currentPage={`Siklus Hidup - ${currentStageData?.name || 'Remaja'}`}
        />

        {/* Hero Section */}
        <div className="relative">
          <section className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
            <div className="container-custom relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 sm:mb-8 lg:mb-10"
              >
                <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-white mb-3 sm:mb-4 font-bold">
                  Siklus Hidup Kesehatan
                </h1>
                <p className="text-body-md sm:text-body-lg text-white/95 max-w-[794px] leading-relaxed">
                  Pendampingan menjaga kesehatan sepanjang siklus kehidupan,
                  dengan informasi khusus setiap tahap usia
                </p>
              </motion.div>
            </div>
          </section>

          {/* Lifecycle Cards - Overlap */}
          <div className="absolute left-0 right-0 top-[calc(100%-50px)] sm:top-[calc(100%-20px)] lg:top-[calc(100%-80px)] z-20 pointer-events-none">
            <div className="container-custom">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6 xl:gap-8 items-end pointer-events-auto">
                {lifecycleStages.map((stage, index) => (
                  <LifecycleStageCard
                    key={stage.id}
                    stage={stage}
                    index={index}
                    isSelected={stage.slug === selectedStage}
                    onClick={() => handleStageChange(stage.slug)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="relative bg-white pt-[140px] sm:pt-[180px] lg:pt-[280px] pb-8 sm:pb-10 lg:pb-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT: Main Content */}
              <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
                {/* Hero Image */}
                <div>
                  <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8 h-[250px] sm:h-[350px] lg:h-[500px] relative mb-6">
                    <img
                      src={currentStageData?.image}
                      alt={currentStageData?.alt}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-90"
                      loading="lazy"
                    />
                    <div className="relative z-10">
                      <div className="bg-brand-accent inline-block rounded-full px-4 py-1.5 mb-4">
                        <p className="font-medium text-body-md text-gray-900">
                          {currentStageData?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Title & Age */}
                  <div className="mb-6">
                    <p className="text-gray-600 text-body-sm sm:text-body-md mb-2">
                      Kelompok Umur
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                      <h2 className="text-brand-primary text-heading-lg sm:text-display-sm lg:text-display-md font-semibold">
                        {currentStageData?.name}
                      </h2>
                      <span className="text-gray-600 text-body-lg sm:text-heading-sm">
                        •
                      </span>
                      <p className="text-gray-600 text-body-md sm:text-body-lg lg:text-heading-sm">
                        {currentStageData?.age}
                      </p>
                    </div>
                  </div>

                  {/* Tags + Share */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Penyakit Pernapasan', 'Kardiovaskular', 'Pencernaan', 'Neoplasma'].map(
                        (tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-brand-primary text-brand-primary font-medium cursor-default
                                     hover:bg-brand-primary hover:text-white hover:border-brand-primary 
                                     transition-all duration-300 hover:shadow-md"
                          >
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>

                    {/* Share Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare('share')}
                        className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                        aria-label="Bagikan"
                      >
                        <Share2 size={16} />
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                        aria-label="Bagikan ke Facebook"
                      >
                        <Facebook size={16} />
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                        aria-label="Bagikan ke Twitter"
                      >
                        <Twitter size={16} />
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors shadow-sm"
                        aria-label="Salin Link"
                      >
                        <Link2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="space-y-4">
                    {(currentContent as any)?.description && (
                      <p className="text-body-md lg:text-body-lg text-gray-700 leading-relaxed text-justify">
                        {(currentContent as any).description}
                      </p>
                    )}
                    {(currentContent as any)?.description2 && (
                      <p className="text-body-md lg:text-body-lg text-gray-700 leading-relaxed text-justify">
                        {(currentContent as any).description2}
                      </p>
                    )}
                    {(currentContent as any)?.description3 && (
                      <p className="text-body-md lg:text-body-lg text-gray-700 leading-relaxed text-justify">
                        {(currentContent as any).description3}
                      </p>
                    )}
                    {(currentContent as any)?.description4 && (
                      <p className="text-body-md lg:text-body-lg text-gray-700 leading-relaxed text-justify">
                        {(currentContent as any).description4}
                      </p>
                    )}
                    {(currentContent as any)?.description5 && (
                      <p className="text-body-md lg:text-body-lg text-gray-700 leading-relaxed text-justify">
                        {(currentContent as any).description5}
                      </p>
                    )}
                  </div>
                </div>

                {/* Topik Kesehatan */}
                {topics.length > 0 && (
                  <TopicCarousel
                    topics={topics}
                    currentIndex={currentTopicIndex}
                    onPrevious={() =>
                      setCurrentTopicIndex((prev) => Math.max(0, prev - 1))
                    }
                    onNext={() =>
                      setCurrentTopicIndex((prev) =>
                        Math.min(maxTopicIndex, prev + 1)
                      )
                    }
                    maxIndex={maxTopicIndex}
                  />
                )}

                {/* Penyakit Terkait */}
                {diseases.length > 0 && (
                  <DiseaseCarousel
                    diseases={diseases}
                    currentIndex={currentDiseaseIndex}
                    onPrevious={() =>
                      setCurrentDiseaseIndex((prev) => Math.max(0, prev - 1))
                    }
                    onNext={() =>
                      setCurrentDiseaseIndex((prev) =>
                        Math.min(maxDiseaseIndex, prev + 1)
                      )
                    }
                    maxIndex={maxDiseaseIndex}
                  />
                )}
              </div>

              {/* RIGHT SIDEBAR */}
              <RightSidebar
                className="lg:sticky lg:top-6 lg:self-start"
                showCalendar={true}
                showRelatedArticles={formattedRelatedArticles.length > 0}
                showPublications={publications.length > 0}
                relatedArticles={formattedRelatedArticles}
                publications={publications}
                viewMoreLinks={{
                  articles: `/artikel?lifecycle=${selectedStage}`,
                  publications: '/publikasi',
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
