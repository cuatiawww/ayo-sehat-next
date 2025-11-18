'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Clock, TrendingUp, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const popularTopics = [
  'Diabetes',
  'Hipertensi',
  'COVID-19',
  'Jantung',
  'Stroke',
  'Kanker',
  'Asma',
  'Kolesterol',
]

export default function SearchSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Diabetes',
    'Hipertensi',
    'COVID-19',
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Filter suggestions
  const filteredSuggestions = searchQuery.trim()
    ? popularTopics.filter((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const allSuggestions = searchQuery.trim()
    ? filteredSuggestions.slice(0, 8)
    : recentSearches

  // Handle search
  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) return

    // Add to recent searches
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)])
    }

    // Navigate to search page
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setShowSuggestions(false)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions && e.key === 'ArrowDown') {
      setShowSuggestions(true)
      return
    }

    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSearch(allSuggestions[selectedIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-semibold text-brand-primary">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  // Remove recent search
  const removeRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRecentSearches(recentSearches.filter((s) => s !== search))
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-heading-lg sm:text-heading-lg lg:text-display-sm text-brand-primary mb-3 sm:mb-4">
            Cari Informasi Kesehatan
          </h2>
          <p className="text-body-md sm:text-body-md lg:text-body-lg text-gray-600 max-w-3xl mx-auto">
            Temukan informasi kesehatan, penyakit, gejala, dan layanan medis
            yang Anda butuhkan
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative" ref={suggestionsRef}>
              <Input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                  setSelectedIndex(-1)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder="Cari penyakit, gejala, atau layanan kesehatan..."
                className="h-[50px] sm:h-[56px] lg:h-[60px] bg-white rounded-xl border-gray-300 px-4 sm:px-5 text-body-sm sm:text-body-md"
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(false)
                    inputRef.current?.focus()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              )}

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && allSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                  >
                    {/* Header */}
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                      {searchQuery.trim() ? (
                        <>
                          <TrendingUp size={16} className="text-brand-primary" />
                          <span className="text-caption font-medium text-gray-600">
                            Saran Pencarian
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-caption font-medium text-gray-600">
                            Pencarian Terakhir
                          </span>
                        </>
                      )}
                    </div>

                    {/* Suggestions List */}
                    <div className="py-1">
                      {allSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between gap-3 transition-colors ${
                            selectedIndex === index
                              ? 'bg-gray-50 text-brand-primary'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {searchQuery.trim() ? (
                              <Search
                                size={16}
                                className="text-gray-400 flex-shrink-0"
                              />
                            ) : (
                              <Clock
                                size={16}
                                className="text-gray-400 flex-shrink-0"
                              />
                            )}
                            <span className="text-body-sm truncate">
                              {highlightMatch(suggestion, searchQuery)}
                            </span>
                          </div>

                          {!searchQuery.trim() && (
                            <button
                              onClick={(e) =>
                                removeRecentSearch(suggestion, e)
                              }
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                              aria-label={`Remove ${suggestion}`}
                            >
                              <X size={14} className="text-gray-400" />
                            </button>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Footer */}
                    {searchQuery.trim() && filteredSuggestions.length > 0 && (
                      <div className="px-4 py-2 border-t border-gray-100 text-tiny text-gray-500 text-center">
                        Gunakan ↑ ↓ untuk navigasi, Enter untuk memilih
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              onClick={() => handleSearch()}
              className="btn-brand-primary h-[50px] sm:h-[56px] lg:h-[60px] px-6 sm:px-7 lg:px-8 gap-2"
            >
              <Search size={18} />
              <span>Cari</span>
            </Button>
          </div>

          {/* Popular Topics */}
          {!searchQuery && !showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 flex flex-wrap gap-2 items-center justify-center"
            >
              <span className="text-body-sm text-gray-600">
                Topik Populer:
              </span>
              {['Diabetes', 'Jantung', 'COVID-19', 'Hipertensi', 'Stroke'].map(
                (topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="cursor-pointer hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
                    onClick={() => handleSearch(topic)}
                  >
                    {topic}
                  </Badge>
                )
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}