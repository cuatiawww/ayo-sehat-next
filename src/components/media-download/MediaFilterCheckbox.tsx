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
    className="flex items-center gap-3 cursor-pointer group select-none"
  >
    <input
      type="checkbox"
      checked={selectedFilters.includes(option.id)}
      onChange={() => handleToggle(option.id)}
      className="w-5 h-5 text-brand-primary border-2 border-brand-primary/40 rounded 
                 focus:ring-2 focus:ring-brand-primary/30 cursor-pointer 
                 accent-brand-primary"
    />
    <span className="text-body-sm text-brand-primary font-medium group-hover:text-brand-primary-dark transition-colors">
      {option.label}
    </span>
  </label>
))}
    </div>
  )
}