'use client'

import { motion } from 'framer-motion'

interface AlphabetFilterProps {
  alphabet: string[]
  selectedLetter: string | null
  healthTopicsData: Record<string, string[]>
  onLetterClick: (letter: string) => void
  onShowAll: () => void
}

export default function AlphabetFilter({
  alphabet,
  selectedLetter,
  healthTopicsData,
  onLetterClick,
  onShowAll,
}: AlphabetFilterProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <button
          onClick={onShowAll}
          className={`
            font-semibold text-body-sm sm:text-body-md
            px-5 sm:px-6 h-[40px] sm:h-[42px] whitespace-nowrap
            rounded-lg transition-all duration-300 shadow-sm
            ${
              !selectedLetter
                ? 'bg-white text-brand-primary hover:bg-white/90'
                : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white/30 hover:border-white'
            }
          `}
          aria-label="Tampilkan semua topik kesehatan"
        >
          Tampilkan Semua
        </button>
      </div>

      {/* Alphabet Scroll */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {alphabet.map((letter) => {
            const hasContent = healthTopicsData[letter]?.length > 0
            const isSelected = selectedLetter === letter

            return (
              <button
                key={letter}
                onClick={() => onLetterClick(letter)}
                className={`
                  font-semibold text-body-md sm:text-body-lg
                  min-w-[40px] w-[40px] h-[40px] sm:min-w-[44px] sm:w-[44px] sm:h-[44px]
                  rounded-lg transition-all duration-200
                  flex items-center justify-center shrink-0
                  ${
                    hasContent
                      ? isSelected
                        ? 'bg-white text-brand-primary shadow-lg scale-105'
                        : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white hover:text-brand-primary hover:border-white'
                      : 'bg-white/10 text-white/50 border-2 border-white/30 hover:bg-white/20 cursor-pointer'
                  }
                `}
                aria-label={`Filter topik kesehatan dengan huruf ${letter}`}
              >
                {letter}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Filter */}
      {selectedLetter && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="text-caption sm:text-body-sm text-white/90">
            Filter aktif:
          </span>
          <span className="px-2.5 py-1 bg-white text-brand-primary font-medium text-caption rounded shadow-sm">
            {selectedLetter}
          </span>
          <button
            onClick={onShowAll}
            className="text-caption text-white/90 hover:text-white underline underline-offset-2"
            aria-label="Hapus filter huruf"
          >
            Hapus
          </button>
        </motion.div>
      )}
    </div>
  )
}