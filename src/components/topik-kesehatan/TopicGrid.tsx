'use client'

import { AnimatePresence } from 'framer-motion'
import TopicCard from './TopicCard'

interface TopicGridProps {
  filteredAlphabet: string[]
  healthTopicsData: Record<string, string[]>
  newTopics: Record<string, number[]>
  getFilteredTopics: (letter: string) => string[]
  selectedLetter: string | null
}

export default function TopicGrid({
  filteredAlphabet,
  healthTopicsData,
  newTopics,
  getFilteredTopics,
  selectedLetter,
}: TopicGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      <AnimatePresence mode="wait">
        {filteredAlphabet.map((letter, index) => {
          const topics = getFilteredTopics(letter)
          const hasContent = healthTopicsData[letter]?.length > 0

          // Skip empty letters when filtered
          if (!hasContent && selectedLetter) return null

          return (
            <TopicCard
              key={letter}
              letter={letter}
              topics={topics}
              newTopics={newTopics[letter] || []}
              index={index}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
