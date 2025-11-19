'use client'

import { useState } from 'react'
import { List, ChevronDown } from 'lucide-react'

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
    <div className="pb-6 border-b border-gray-200">
      {/* SINGLE ROW - All items horizontal */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* LEFT: TABS */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-body-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-primary/50 hover:text-brand-primary'
              }`}
            >
              {tab === 'Semua' && <List className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {/* RIGHT: DROPDOWNS */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Lifecycle Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLifecycleDropdown(!showLifecycleDropdown)
                setShowTopicDropdown(false)
                setShowSortDropdown(false)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-body-sm text-gray-700 hover:border-brand-primary/50 transition-all min-w-[140px]"
            >
              <span className="flex-1 text-left truncate">
                {selectedLifecycle}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-brand-primary transition-transform ${
                  showLifecycleDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showLifecycleDropdown && (
              <div className="absolute top-full right-0 mt-2 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                {lifecycleStages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      onLifecycleChange(stage)
                      setShowLifecycleDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-body-sm transition-colors ${
                      selectedLifecycle === stage
                        ? 'bg-brand-primary/10 text-brand-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
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
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-body-sm text-gray-700 hover:border-brand-primary/50 transition-all min-w-[160px]"
            >
              <span className="flex-1 text-left truncate">{selectedTopic}</span>
              <ChevronDown
                className={`w-4 h-4 text-brand-primary transition-transform ${
                  showTopicDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showTopicDropdown && (
              <div className="absolute top-full right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto">
                <button
                  onClick={() => {
                    onTopicChange('Topik Kesehatan')
                    setShowTopicDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-body-sm transition-colors ${
                    selectedTopic === 'Topik Kesehatan'
                      ? 'bg-brand-primary/10 text-brand-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
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
                    className={`w-full text-left px-4 py-2.5 text-body-sm transition-colors ${
                      selectedTopic === topic
                        ? 'bg-brand-primary/10 text-brand-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
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
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-body-sm text-gray-700 hover:border-brand-primary/50 transition-all min-w-[120px]"
            >
              <span className="flex-1 text-left truncate">{selectedSort}</span>
              <ChevronDown
                className={`w-4 h-4 text-brand-primary transition-transform ${
                  showSortDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onSortChange(option)
                      setShowSortDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-body-sm transition-colors ${
                      selectedSort === option
                        ? 'bg-brand-primary/10 text-brand-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
