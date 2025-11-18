'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import SearchSidebar from '@/components/sidebar/SearchSidebar'
import ResultSection from '@/components/search/ResultSection'
import data from '@/data/search.json'

const { articles, downloadItems, topicItems, campaignItems } = data

interface SearchResultsClientProps {
  searchQuery: string
}

export default function SearchResultsClient({
  searchQuery,
}: SearchResultsClientProps) {
  const router = useRouter()
  const [activeCategories, setActiveCategories] = useState<string[]>([
    'articles',
    'download',
    'topics',
    'agenda',
  ])

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const isCategoryActive = (category: string) =>
    activeCategories.includes(category)

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`) 
    }
  }

  // Add type to items
  const articlesWithType = articles.map((item) => ({ ...item, type: 'article' as const }))
  const downloadsWithType = downloadItems.map((item) => ({ ...item, type: 'download' as const }))
  const topicsWithType = topicItems.map((item) => ({ ...item, type: 'topic' as const }))
  const campaignsWithType = campaignItems.map((item) => ({ ...item, type: 'campaign' as const }))

  const totalResults =
    articles.length +
    downloadItems.length +
    topicItems.length +
    campaignItems.length

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Hasil Pencarian: "${searchQuery}"`,
    url: `http://localhost:3000/search?q=${encodeURIComponent(searchQuery)}`,
    query: searchQuery,
    numberOfItems: totalResults,
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-white"
      >
        <CustomBreadcrumb
          currentPage={searchQuery ? `Pencarian: ${searchQuery}` : 'Pencarian'}
        />

        {/* Header */}
        <div className="bg-white py-4 lg:py-5 border-b border-gray-100">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-body-sm sm:text-body-md text-gray-600">
                <span className="font-semibold text-gray-900">
                  Hasil ({totalResults})
                </span>{' '}
                untuk pencarian {searchQuery}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-body-sm sm:text-body-md text-gray-600">
                  Sortir:
                </span>
                <select className="text-body-sm sm:text-body-md text-brand-primary bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all">
                  <option value="">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="terpopuler">Terpopuler</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="container-custom section-padding-lg">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-6 self-start">
              <SearchSidebar
                searchQuery={searchQuery}
                activeCategories={activeCategories}
                onToggleCategory={toggleCategory}
                onSearch={handleSearch}
              />
            </aside>

            {/* Main Content */}
            <main>
              <AnimatePresence mode="wait">
                {/* Articles */}
                {isCategoryActive('articles') && articles.length > 0 && (
                  <ResultSection
                    key="articles"
                    title={`Pencarian "${searchQuery}" dalam Artikel Siklus Hidup`}
                    subtitle={`Menampilkan ${articles.length} dari 15 hasil pencarian`}
                    items={articlesWithType}
                    searchQuery={searchQuery}
                    categoryType="articles"
                  />
                )}

                {/* Download */}
                {isCategoryActive('download') && downloadItems.length > 0 && (
                  <ResultSection
                    key="download"
                    title={`Pencarian "${searchQuery}" dalam Media Download`}
                    subtitle={`Menampilkan ${downloadItems.length} dari 3 hasil pencarian`}
                    items={downloadsWithType}
                    searchQuery={searchQuery}
                    categoryType="download"
                  />
                )}

                {/* Topics */}
                {isCategoryActive('topics') && topicItems.length > 0 && (
                  <ResultSection
                    key="topics"
                    title={`Pencarian "${searchQuery}" dalam Topik Kesehatan A-Z`}
                    subtitle={`Menampilkan ${topicItems.length} dari 4 hasil pencarian`}
                    items={topicsWithType}
                    searchQuery={searchQuery}
                    categoryType="topics"
                  />
                )}

                {/* Agenda */}
                {isCategoryActive('agenda') && campaignItems.length > 0 && (
                  <ResultSection
                    key="agenda"
                    title={`Pencarian "${searchQuery}" dalam Agenda Kegiatan`}
                    subtitle={`Menampilkan ${campaignItems.length} dari 1 hasil pencarian`}
                    items={campaignsWithType}
                    searchQuery={searchQuery}
                    categoryType="agenda"
                  />
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </motion.div>
    </>
  )
}