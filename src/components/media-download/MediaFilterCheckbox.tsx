'use client'

import { Check } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
}

interface MediaFilterCheckboxProps {
  title: string
  options: FilterOption[]
  selectedFilters: string[]
  onFilterChange: (filters: string[]) => void
}

export default function MediaFilterCheckbox({
  options,
  selectedFilters,
  onFilterChange,
}: MediaFilterCheckboxProps) {
  const handleToggle = (id: string) => {
    if (selectedFilters.includes(id)) {
      onFilterChange(selectedFilters.filter((f) => f !== id))
    } else {
      onFilterChange([...selectedFilters, id])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isChecked = selectedFilters.includes(option.id)
        
        return (
          <label
            key={option.id}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Custom Checkbox */}
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option.id)}
                className="sr-only peer"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                  isChecked
                    ? 'bg-brand-primary border-brand-primary'
                    : 'bg-white border-gray-300 group-hover:border-brand-primary/50'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
            </div>

            {/* Label */}
            <span
              className={`text-body-sm font-medium transition-colors ${
                isChecked
                  ? 'text-brand-primary'
                  : 'text-gray-600 group-hover:text-brand-primary'
              }`}
            >
              {option.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}