/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SearchSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate ke search page dengan query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any)
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
              Temukan artikel, topik, dan informasi kesehatan yang Anda
              butuhkan
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-3 sm:gap-4">
              {/* Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Cari penyakit, gejala, tips kesehatan..."
                  className="w-full h-[56px] pl-12 pr-4 text-body-md rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white transition-all placeholder:text-gray-400"
                  aria-label="Cari informasi kesehatan"
                />
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

            {/* Popular Keywords (Optional) */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-caption text-gray-500">Topik Populer:</span>
              {[
                'Diabetes',
                'Hipertensi',
                'Imunisasi',
                'Stunting',
                'COVID-19',
              ].map((keyword) => (
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
              ))}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}