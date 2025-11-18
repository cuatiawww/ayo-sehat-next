'use client'

import { useState } from 'react'
import { List } from 'lucide-react'

interface ArticleFilterProps {
  activeTab: string
  selectedLifecycle: string
  selectedTopic: string
  selectedSort: string
  lifecycleStages: string[]
  popularTopics: string[]
  sortOptions: string[]
  onTabChange: (tab: string) => void
  onLifecycleChange: (stage: string) => void
  onTopicChange: (topic: string) => void
  onSortChange: (sort: string) => void
}

export default function ArticleFilter({
  activeTab,
  selectedLifecycle,
  selectedTopic,
  selectedSort,
  lifecycleStages,
  popularTopics,
  sortOptions,
  onTabChange,
  onLifecycleChange,
  onTopicChange,
  onSortChange,
}: ArticleFilterProps) {
  const [showLifecycleDropdown, setShowLifecycleDropdown] = useState(false)
  const [showTopicDropdown, setShowTopicDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const tabs = ['Semua', 'Cegah', 'Deteksi', 'Pengobatan']

  return (
    <div className="flex flex-col gap-4 pb-5 border-b border-gray-200">
      {/* TABS */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex items-center gap-2 px-3 xs:px-4 py-2.5 rounded-lg text-body-sm sm:text-body-md font-medium transition-all ${
              activeTab === tab
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-brand-primary/50'
            }`}
          >
            {tab === 'Semua' && <List className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* DROPDOWNS */}
      <div className="flex flex-wrap gap-2">
        {/* Lifecycle Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLifecycleDropdown(!showLifecycleDropdown)
              setShowTopicDropdown(false)
              setShowSortDropdown(false)
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-caption sm:text-body-sm text-gray-600 hover:border-brand-primary transition-all"
          >
            <span className="truncate max-w-[100px] xs:max-w-[120px]">
              {selectedLifecycle}
            </span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path d="M7 10L12 15L17 10H7Z" fill="#18B3AB" />
            </svg>
          </button>
          {showLifecycleDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {lifecycleStages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => {
                    onLifecycleChange(stage)
                    setShowLifecycleDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 text-caption sm:text-body-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  {stage}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Topic Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTopicDropdown(!showTopicDropdown)
              setShowLifecycleDropdown(false)
              setShowSortDropdown(false)
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-caption sm:text-body-sm text-gray-600 hover:border-brand-primary transition-all"
          >
            <span className="truncate max-w-[100px] xs:max-w-[120px]">
              {selectedTopic}
            </span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path d="M7 10L12 15L17 10H7Z" fill="#18B3AB" />
            </svg>
          </button>
          {showTopicDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
              <button
                onClick={() => {
                  onTopicChange('Topik Kesehatan')
                  setShowTopicDropdown(false)
                }}
                className="w-full text-left px-3 py-2 text-caption sm:text-body-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary"
              >
                Topik Kesehatan
              </button>
              {popularTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    onTopicChange(topic)
                    setShowTopicDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 text-caption sm:text-body-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSortDropdown(!showSortDropdown)
              setShowLifecycleDropdown(false)
              setShowTopicDropdown(false)
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-caption sm:text-body-sm text-gray-600 hover:border-brand-primary transition-all"
          >
            <span className="truncate max-w-[100px] xs:max-w-[120px]">
              {selectedSort}
            </span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path d="M7 10L12 15L17 10H7Z" fill="#18B3AB" />
            </svg>
          </button>
          {showSortDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSortChange(option)
                    setShowSortDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 text-caption sm:text-body-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}