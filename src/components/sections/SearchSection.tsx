/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Clock, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Dummy data untuk autocomplete suggestions
const SUGGESTIONS_DATA = [
  { text: 'Hamil', category: 'Kondisi', searches: '12K' },
  { text: 'Hamil Muda', category: 'Kondisi', searches: '8.5K' },
  { text: 'Hamil Tanda-tanda', category: 'Gejala', searches: '6.2K' },
  { text: 'Hamil Trimester Pertama', category: 'Info', searches: '5.8K' },
  { text: 'Hamil Makanan yang Harus Dihindari', category: 'Tips', searches: '4.3K' },
  { text: 'Diabetes', category: 'Penyakit', searches: '15K' },
  { text: 'Diabetes Tipe 2', category: 'Penyakit', searches: '9.2K' },
  { text: 'Diabetes Gejala', category: 'Gejala', searches: '7.1K' },
  { text: 'Hipertensi', category: 'Penyakit', searches: '11K' },
  { text: 'Hipertensi Diet', category: 'Tips', searches: '4.8K' },
  { text: 'Imunisasi Bayi', category: 'Vaksin', searches: '8.9K' },
  { text: 'Imunisasi Anak', category: 'Vaksin', searches: '6.7K' },
  { text: 'Stunting Pencegahan', category: 'Info', searches: '5.4K' },
  { text: 'COVID-19 Gejala', category: 'Gejala', searches: '13K' },
  { text: 'COVID-19 Vaksin', category: 'Vaksin', searches: '10K' },
]

// Recent searches (dummy - ini bisa dari localStorage)
const RECENT_SEARCHES = [
  'Gejala Demam Berdarah',
  'Cara Menurunkan Kolesterol',
  'Vitamin untuk Ibu Hamil',
]

export default function SearchSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof SUGGESTIONS_DATA>([])
  const searchRef = useRef<HTMLFormElement>(null)

  // Filter suggestions berdasarkan input
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = SUGGESTIONS_DATA.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6) // Limit to 6 suggestions
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any)
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary mb-3 font-semibold">
              Pencarian Ayo Sehat
            </h2>
            <p className="text-body-sm sm:text-body-md text-gray-600">
              Temukan artikel, topik, dan informasi kesehatan yang Anda butuhkan
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative" ref={searchRef}>
            <div className="flex gap-3 sm:gap-4">
              {/* Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  placeholder="Cari penyakit, gejala, tips kesehatan..."
                  className="w-full h-[56px] pl-12 pr-4 text-body-md rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white transition-all placeholder:text-gray-400"
                  aria-label="Cari informasi kesehatan"
                  autoComplete="off"
                />

                {/* Dropdown Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                    >
                      {/* Suggestions List */}
                      {filteredSuggestions.length > 0 ? (
                        <div className="py-2">
                          {filteredSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSuggestionClick(suggestion.text)}
                              className="w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between gap-3 transition-colors group"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Search className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-colors flex-shrink-0" />
                                <div className="text-left flex-1 min-w-0">
                                  <p className="text-body-sm text-gray-900 group-hover:text-brand-primary transition-colors truncate">
                                    {suggestion.text}
                                  </p>
                                  <p className="text-caption text-gray-500">
                                    {suggestion.category}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-caption text-gray-400 flex-shrink-0">
                                <TrendingUp className="w-3 h-3" />
                                <span>{suggestion.searches}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        /* Recent Searches (when no input) */
                        searchQuery.length === 0 && (
                          <div className="py-2">
                            <div className="px-4 py-2 text-caption text-gray-500 font-semibold">
                              Pencarian Terkini
                            </div>
                            {RECENT_SEARCHES.map((recent, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleSuggestionClick(recent)}
                                className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors group"
                              >
                                <Clock className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-colors" />
                                <span className="text-body-sm text-gray-700 group-hover:text-brand-primary transition-colors">
                                  {recent}
                                </span>
                              </button>
                            ))}
                          </div>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn-brand-primary px-8 h-[56px] rounded-xl flex items-center gap-2 font-semibold hover:scale-105 transition-transform"
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Cari</span>
              </button>
            </div>

            {/* Popular Keywords */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-caption text-gray-500">Topik Populer:</span>
              {['Diabetes', 'Hipertensi', 'Imunisasi', 'Stunting', 'COVID-19'].map(
                (keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => {
                      setSearchQuery(keyword)
                      router.push(`/search?q=${encodeURIComponent(keyword)}`)
                    }}
                    className="px-3 py-1 text-caption text-brand-primary bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-full transition-colors"
                  >
                    {keyword}
                  </button>
                )
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
