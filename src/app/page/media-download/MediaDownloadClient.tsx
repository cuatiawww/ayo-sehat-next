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
    url: 'https://staging-ayo-sehat-v2.vercel.app/media-download',
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
        <section className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark py-12 sm:py-16 lg:py-20">
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
            {/* Search + Filter Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-white rounded-3xl border-2 border-brand-primary/20 shadow-md overflow-hidden"
            >
              {/* Search Bar */}
              <div className="p-6 sm:p-8">
                <div className="relative max-w-3xl mx-auto">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Masukkan Kata Kunci"
                    className="w-full h-14 pl-14 pr-6 text-body-md rounded-xl border-2 border-gray-200 
                             focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 
                             transition-all placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>

              {/* Filter Checkboxes */}
              <div className="px-6 sm:px-8 pb-8 pt-4 bg-gray-50/50 border-t border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4">
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
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* LEFT: Media Grid */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-body-md text-gray-600">
                    Menampilkan {filteredItems.length} media
                  </p>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white">
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