'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

interface TopicCardProps {
  letter: string
  topics: string[]
  newTopics?: number[]
  index: number
}

export default function TopicCard({
  letter,
  topics,
  newTopics = [],
  index,
}: TopicCardProps) {
  const hasTopics = topics.length > 0

  return (
    <motion.div
      id={`letter-${letter}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200 hover:border-brand-primary/30 hover:shadow-card transition-all duration-300 h-full">
        {/* Letter Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="font-bold text-[40px] sm:text-[50px] lg:text-[60px] text-brand-primary leading-none group-hover:scale-110 transition-transform duration-300">
            {letter}
          </div>
          <div className="flex-1 h-[2px] bg-gray-200 rounded-full" />
        </div>

        {/* Topics List */}
        {hasTopics ? (
          <>
            <div className="space-y-2">
              {topics.map((topic, idx) => {
                const slug = topic
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')
                const isNew = newTopics.includes(idx)

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <Link
                      href={`/topik-kesehatan/${slug}`}
                      className="w-full text-left text-body-sm sm:text-body-md lg:text-body-lg text-gray-900 py-1.5 px-2 rounded-md hover:bg-brand-primary hover:text-white transition-all duration-200 group/item flex items-center justify-between gap-2"
                      aria-label={`Baca tentang ${topic}`}
                    >
                      <span>{topic}</span>
                      {isNew && (
                        <div className="inline-flex items-center px-[7px] py-[3px] bg-brand-accent rounded-md shrink-0 group-hover/item:bg-brand-accent-dark transition-colors">
                          <span className="text-[9px] sm:text-[10px] text-gray-900 font-medium">
                            BARU
                          </span>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Topic Count */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-tiny sm:text-caption text-gray-500 text-center">
                {topics.length} topik tersedia
              </p>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="w-16 h-16 mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-body-sm sm:text-body-md text-gray-500 text-center mb-1">
              Topik belum tersedia
            </p>
            <p className="text-tiny sm:text-caption text-gray-400 text-center">
              Dalam tahap pengembangan
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
