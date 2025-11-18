/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import RightSidebar from '@/components/sidebar/RightSidebar'
import ArticleFilter from '@/components/article/ArticleFilter'
import ArticleGrid from '@/components/article/ArticleGrid'
import Pagination from '@/components/article/Pagination'
import data from '@/data/artikel.json'


const { articles, popularTopics } = data

const lifecycleStages = [
  'Semua Usia',
  'Bayi dan Balita',
  'Anak-Anak',
  'Remaja',
  'Dewasa',
  'Lansia',
]
const sortOptions = ['Terbaru', 'Terlama', 'Paling Populer']

export default function ArtikelClient() {
  const [activeTab, setActiveTab] = useState<string>('Semua')
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>('Semua Usia')
  const [selectedTopic, setSelectedTopic] = useState<string>('Topik Kesehatan')
  const [selectedSort, setSelectedSort] = useState<string>('Terbaru')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 10

  // Filter & Sort Logic
  const filteredAndSortedArticles = articles
    .filter((article) => {
      if (activeTab !== 'Semua' && article.category !== activeTab) return false
      if (
        selectedLifecycle !== 'Semua Usia' &&
        !article.lifecycleStage.includes(selectedLifecycle)
      )
        return false
      if (
        selectedTopic !== 'Topik Kesehatan' &&
        !article.title.toLowerCase().includes(selectedTopic.toLowerCase()) &&
        !article.excerpt.toLowerCase().includes(selectedTopic.toLowerCase())
      )
        return false
      return true
    })
    .sort((a, b) => {
      if (selectedSort === 'Terbaru')
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (selectedSort === 'Terlama')
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (selectedSort === 'Paling Populer') {
        return (
          parseInt(b.views.replace(/\./g, '')) -
          parseInt(a.views.replace(/\./g, ''))
        )
      }
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedArticles.length / articlesPerPage
  )
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredAndSortedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, selectedLifecycle, selectedTopic, selectedSort])

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Artikel Ayo Sehat',
    description:
      'Kumpulan artikel kesehatan terlengkap dari bayi hingga lansia. Temukan tips cegah, deteksi, dan pengobatan berdasarkan tahap kehidupan.',
    url: 'http://localhost:3000/artikel',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: article.image,
          datePublished: article.date,
          author: { '@type': 'Organization', name: 'Kemenkes Ayo Sehat' },
        },
      })),
    },
  }

  const ogImage =
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Artikel" />

        {/* HERO */}
        <section className="relative bg-brand-gradient py-10 sm:py-14 lg:py-20 overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-full sm:max-w-[600px]"
            >
              <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg leading-tight text-white mb-3 sm:mb-4">
                Artikel Ayo Sehat
              </h1>
              <p className="text-body-sm sm:text-body-md lg:text-body-lg leading-relaxed text-white/90">
                Pendekatan menjaga kesehatan sejak lahir hingga lanjut usia,
                dengan perhatian khusus sesuai kebutuhan di setiap tahap usia.
              </p>
            </motion.div>
          </div>

         
        </section>

        {/* TOPIK POPULER */}
        <section className="bg-white section-padding-lg">
          
          <div className="container-custom">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-gray-800 mb-5 sm:mb-6 font-semibold">
                Topik yang Banyak Dicari
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {popularTopics.map((topic, index) => (
                  <motion.button
                    key={topic.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    onClick={() => setSelectedTopic(topic.text)}
                    className="text-left text-body-sm sm:text-body-md text-brand-primary bg-white border border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/5 px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    # {topic.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
           {/* GAMBAR HERO - DESKTOP ONLY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute right-0 bottom-[-60px] sm:bottom-[-80px] lg:bottom-[-120px] hidden lg:block z-10"
          >
            <div className="w-[300px] sm:w-[400px] lg:w-[480px] xl:w-[580px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={ogImage}
                alt="Dokter sedang bekerja"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </section>

        {/* MAIN CONTENT */}
        <section className="section-padding-lg bg-white border-t border-gray-100">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-6 lg:gap-10">
              {/* LEFT: ARTIKEL */}
              <div className="space-y-6">
                {/* FILTER */}
                <ArticleFilter
                  activeTab={activeTab}
                  selectedLifecycle={selectedLifecycle}
                  selectedTopic={selectedTopic}
                  selectedSort={selectedSort}
                  lifecycleStages={lifecycleStages}
                  popularTopics={popularTopics.map((t) => t.text)}
                  sortOptions={sortOptions}
                  onTabChange={setActiveTab}
                  onLifecycleChange={setSelectedLifecycle}
                  onTopicChange={setSelectedTopic}
                  onSortChange={setSelectedSort}
                />

                {/* Result Count */}
                <div className="text-body-sm text-gray-600">
                  Menampilkan {filteredAndSortedArticles.length} artikel
                </div>

                {/* ARTIKEL GRID */}
                {currentArticles.length > 0 ? (
                  <>
                    <ArticleGrid articles={currentArticles} />

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </>
                ) : (
                  // Empty State
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-heading-sm text-gray-700 mb-2 font-medium">
                      Tidak ada artikel ditemukan
                    </h3>
                    <p className="text-body-md text-gray-500 max-w-md mx-auto">
                      Coba ubah filter atau kata kunci pencarian untuk melihat
                      artikel lainnya
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT: SIDEBAR */}
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
