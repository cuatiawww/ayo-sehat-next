    'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import AlphabetFilter from '@/components/topik-kesehatan/AlphabetFilter'
import TopicGrid from '@/components/topik-kesehatan/TopicGrid'
import { Button } from '@/components/ui/button'
import data from '@/data/topik-kesehatan.json'

const { healthTopicsData, newTopics } = data

type Letter = keyof typeof healthTopicsData

export default function TopikKesehatanClient() {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const letterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const alphabet = Object.keys(healthTopicsData) as Letter[]

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Auto scroll to active letter
  useEffect(() => {
    if (selectedLetter && letterRefs.current[selectedLetter]) {
      letterRefs.current[selectedLetter]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [selectedLetter])

  // Filter logic
  const filteredAlphabet = selectedLetter ? [selectedLetter] : alphabet

  const getFilteredTopics = (letter: string) => {
  const l = letter as Letter
  const topics = healthTopicsData[l] || []
  if (!debouncedQuery) return topics

  return topics.filter((topic) =>
    topic.toLowerCase().includes(debouncedQuery.toLowerCase())
  )
}


  const totalTopics = filteredAlphabet.reduce(
    (acc, letter) => acc + getFilteredTopics(letter).length,
    0
  )

  const handleLetterClick = (letter: string) => {
    const hasContent = healthTopicsData[letter as Letter]?.length > 0
    if (hasContent) {
      setSelectedLetter(letter as Letter)
    }
  }

  const handleShowAll = () => {
    setSelectedLetter(null)
  }

  // JSON-LD
  const baseUrl = 'https://staging-ayo-sehat-v2.vercel.app/topik-kesehatan'
  const itemList = Object.entries(healthTopicsData).flatMap(([, topics]) =>
    topics.map((topic, index) => {
      const slug = topic
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: topic,
        url: `${baseUrl}#${slug}`,
      }
    })
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Daftar Topik Kesehatan A-Z',
    description: 'Jelajahi ratusan topik kesehatan dari A sampai Z.',
    numberOfItems: itemList.length,
    itemListElement: itemList,
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Topik Kesehatan" />

        {/* Hero Section */}
        <section className="relative bg-brand-gradient py-6 sm:py-8 lg:py-10 border-b border-brand-primary-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-5 lg:mb-6"
            >
              <h1 className="text-display-sm sm:text-display-md lg:text-display-lg text-white mb-2 font-semibold">
                Topik Kesehatan A-Z
              </h1>
              <p className="text-body-sm sm:text-body-md text-white/80">
                Cari informasi kesehatan berdasarkan abjad atau kata kunci
              </p>
            </motion.div>

            {/* Search + Alphabet */}
            <div className="space-y-3 sm:space-y-4">
              {/* Search Input */}
              <div className="relative flex-1 sm:max-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari topik kesehatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[40px] sm:h-[42px] pl-9 pr-3 text-body-sm sm:text-body-md text-gray-900 bg-white border-2 border-white/50 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                  aria-label="Cari topik kesehatan"
                />
              </div>

              {/* Alphabet Filter */}
              <AlphabetFilter
                alphabet={alphabet}
                selectedLetter={selectedLetter}
                healthTopicsData={healthTopicsData}
                onLetterClick={handleLetterClick}
                onShowAll={handleShowAll}
              />
            </div>
          </div>
        </section>

        {/* Topics Grid */}
        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            {/* Result Count */}
            <div className="mb-6">
              <p className="text-body-md text-gray-600">
                {selectedLetter
                  ? `Ditemukan ${getFilteredTopics(selectedLetter).length} topik dengan huruf "${selectedLetter}"`
                  : `Menampilkan ${totalTopics} topik kesehatan`}
              </p>
            </div>

            {/* Grid */}
            <TopicGrid
              filteredAlphabet={filteredAlphabet}
              healthTopicsData={healthTopicsData}
              newTopics={newTopics}
              getFilteredTopics={getFilteredTopics}
              selectedLetter={selectedLetter}
            />

            {/* Empty State */}
            {totalTopics === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-heading-sm sm:text-heading-md text-gray-700 mb-2 font-medium">
                  Tidak ada topik ditemukan
                </h3>
                <p className="text-body-md text-gray-500 max-w-[400px] mx-auto">
                  Coba gunakan kata kunci lain atau hapus filter untuk melihat
                  semua topik
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding-lg bg-brand-gradient">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-white mb-3 sm:mb-4 font-medium">
                Tidak Menemukan Topik yang Anda Cari?
              </h2>
              <p className="text-body-sm sm:text-body-md lg:text-body-lg text-white/90 mb-6 sm:mb-8 max-w-[700px] mx-auto">
                Hubungi kami atau gunakan fitur pencarian untuk menemukan
                informasi kesehatan yang Anda butuhkan
              </p>
              <Button
  size="lg"
  className="bg-brand-accent hover:bg-brand-accent-hover text-gray-800 font-medium rounded-full px-8 sm:px-10 lg:px-12 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
>
  Hubungi Kami
</Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}