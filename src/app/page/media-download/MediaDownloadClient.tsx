'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import MediaFilterCheckbox from '@/components/media-download/MediaFilterCheckbox'
import MediaGrid from '@/components/media-download/MediaGrid'
import Pagination from '@/components/article/Pagination'
import data from '@/data/media-download.json'

const { mediaItems, filterCategories } = data

export default function MediaDownloadClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Filter logic
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(item.category)
    return matchesSearch && matchesFilter
  })

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Media Download Ayo Sehat',
    description: 'Download berbagai media edukasi kesehatan dari Kemenkes.',
    url: 'http://localhost:3000/media-download',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Media Download" />

        {/* HERO */}
        <section className="relative bg-brand-gradient py-12 sm:py-16 lg:py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg text-white mb-4">
                Media Download
              </h1>
              <p className="text-body-md sm:text-body-lg text-white/90 leading-relaxed">
                Gerakan nasional yang mengajak seluruh masyarakat Indonesia
                untuk menerapkan perilaku hidup bersih dan sehat dalam
                kehidupan sehari-hari. Melalui berbagai kegiatan edukasi, media
                komunikasi, dan kolaborasi lintas sektor, Ayo Sehat berkomitmen
                membangun kesadaran bahwa kesehatan adalah tanggung jawab
                bersama.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Masukkan Kata Kunci"
                  className="w-full h-[52px] pl-12 pr-4 text-body-md rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Filter Checkboxes */}
            <div className="mb-8 bg-gray-50 rounded-2xl p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filterCategories.map((category) => (
                  <MediaFilterCheckbox
                    key={category.id}
                    title={category.title}
                    options={category.options}
                    selectedFilters={selectedFilters}
                    onFilterChange={setSelectedFilters}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT: Media Grid */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-heading-lg sm:text-display-sm text-brand-primary font-semibold">
                    Pencarian Media Download
                  </h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-brand-primary">
                    <option>Terbaru</option>
                    <option>Terlama</option>
                    <option>Paling Populer</option>
                  </select>
                </div>

                <MediaGrid items={currentItems} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>

              {/* RIGHT: Sidebar */}
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