'use client'
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
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selectedFilters.includes(option.id)}
            onChange={() => handleToggle(option.id)}
            className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary cursor-pointer"
          />
          <span className="text-body-sm text-brand-primary group-hover:text-brand-primary-dark transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}