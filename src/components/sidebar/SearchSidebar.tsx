'use client'

import { useState } from 'react'
import {
  Search,
  Users,
  Download,
  Heart,
  Edit,
  Calendar,
  FileText,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface SearchCategory {
  name: string
  count: number
  icon: 'users' | 'download' | 'heart' | 'edit' | 'calendar' | 'document'
  categoryType: string
}

interface SearchSidebarProps {
  searchQuery: string
  activeCategories: string[]
  onToggleCategory: (category: string) => void
  onSearch: (query: string) => void
  categories?: SearchCategory[]
}

const DEFAULT_CATEGORIES: SearchCategory[] = [
  {
    name: 'Artikel Siklus Hidup',
    count: 15,
    icon: 'users',
    categoryType: 'articles',
  },
  {
    name: 'Media Download',
    count: 3,
    icon: 'download',
    categoryType: 'download',
  },
  {
    name: 'Topik Kesehatan A-Z',
    count: 4,
    icon: 'heart',
    categoryType: 'topics',
  },
  {
    name: 'Perangkat Ajar Kesehatan',
    count: 0,
    icon: 'edit',
    categoryType: 'teaching',
  },
  {
    name: 'Agenda Kegiatan',
    count: 1,
    icon: 'calendar',
    categoryType: 'agenda',
  },
  {
    name: 'Artikel Tips Komunikasi Perubahan Perilaku',
    count: 0,
    icon: 'document',
    categoryType: 'communication',
  },
]

export default function SearchSidebar({
  searchQuery,
  activeCategories,
  onToggleCategory,
  onSearch,
  categories = DEFAULT_CATEGORIES,
}: SearchSidebarProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  const isCategoryActive = (category: string) => {
    return activeCategories.includes(category)
  }

  const getIcon = (iconType: string) => {
    const iconClass = 'w-5 h-5 sm:w-6 sm:h-6'
    switch (iconType) {
      case 'users':
        return <Users className={iconClass} />
      case 'download':
        return <Download className={iconClass} />
      case 'heart':
        return <Heart className={iconClass} />
      case 'edit':
        return <Edit className={iconClass} />
      case 'calendar':
        return <Calendar className={iconClass} />
      case 'document':
        return <FileText className={iconClass} />
      default:
        return <Search className={iconClass} />
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = (e.target as HTMLFormElement).querySelector('input')
    if (input?.value.trim()) {
      onSearch(input.value)
    }
  }

  const handleCategoryClick = (
    categoryType: string,
    count: number,
    categoryName: string
  ) => {
    // If category has no results, show custom dialog
    if (count === 0) {
      setDialogMessage(
        `Maaf, untuk pencarian terkait "${searchQuery}" tidak tersedia dalam ${categoryName}`
      )
      setShowDialog(true)
      return
    }

    // Toggle if category has results
    onToggleCategory(categoryType)
  }

  return (
    <>
      <div className="bg-white rounded-xl sm:rounded-[20px] w-full border border-gray-300 shadow-sm sticky top-24">
        <div className="px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8">
          {/* Title */}
          <h2 className="text-heading-sm sm:text-body-lg lg:text-heading-sm text-brand-primary mb-5 sm:mb-6 font-semibold">
            Pencarian Ayosehat
          </h2>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                defaultValue={searchQuery}
                placeholder="Pencarian kata kunci"
                className="w-full h-[48px] sm:h-[51px] bg-gray-50 rounded-lg sm:rounded-[10px] border border-gray-400 px-4 text-body-sm sm:text-body-md text-gray-700 placeholder:text-gray-500 placeholder:italic focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-primary hover:bg-brand-primary-dark transition-colors rounded-lg sm:rounded-[10px] w-[48px] h-[48px] sm:w-[51px] sm:h-[51px] flex items-center justify-center flex-shrink-0 shadow-sm hover:shadow-md"
              aria-label="Cari"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>

          {/* Divider */}
          <div className="bg-gray-200 h-px w-full mb-4 sm:mb-5" />

          {/* Categories List */}
          <div className="space-y-4 sm:space-y-5">
            {categories.map((category, index) => {
              const isExpanded = isCategoryActive(category.categoryType)
              const hasResults = category.count > 0

              return (
                <div key={index}>
                  <button
                    onClick={() =>
                      handleCategoryClick(
                        category.categoryType,
                        category.count,
                        category.name
                      )
                    }
                    className="w-full flex items-center gap-3 lg:gap-4 group transition-all hover:opacity-80 cursor-pointer"
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 transition-colors ${
                        isExpanded
                          ? 'text-brand-primary'
                          : hasResults
                          ? 'text-gray-500'
                          : 'text-gray-400'
                      }`}
                    >
                      {getIcon(category.icon)}
                    </div>

                    {/* Category Name */}
                    <div className="flex-1 text-left">
                      <p
                        className={`text-body-sm sm:text-body-md lg:text-body-lg leading-relaxed transition-colors ${
                          isExpanded
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        {category.name}
                      </p>
                    </div>

                    {/* Count */}
                    <div className="flex-shrink-0">
                      <span
                        className={`text-body-sm sm:text-body-md lg:text-body-lg font-medium ${
                          category.count === 0
                            ? 'text-red-600'
                            : 'text-brand-primary'
                        }`}
                      >
                        ({category.count})
                      </span>
                    </div>

                    {/* Arrow with rotation animation */}
                    <div className="flex-shrink-0">
                      {hasResults ? (
                        <div
                          className={`rounded-lg w-4 h-4 flex items-center justify-center transition-all duration-300 ${
                            isExpanded
                              ? 'bg-brand-primary rotate-90'
                              : 'bg-brand-primary rotate-0'
                          }`}
                        >
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 8 12"
                          >
                            <path
                              d="M1.5 1L6.5 6L1.5 11"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="bg-gray-400 rounded-lg w-3.5 h-3.5 flex items-center justify-center">
                          <svg
                            className="w-2 h-2 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            viewBox="0 0 6 4"
                          >
                            <path
                              d="M5.06667 0.4L2.73333 2.73333L0.4 0.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Divider between items */}
                  {index < categories.length - 1 && (
                    <div className="bg-gray-200 h-px w-full mt-4 sm:mt-5" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Custom Alert Dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-white border-2 border-red-300 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 text-heading-sm">
              Pencarian Tidak Tersedia
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-body-md">
              {dialogMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-brand-primary hover:bg-brand-primary-dark text-white"
              onClick={() => setShowDialog(false)}
            >
              Mengerti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
