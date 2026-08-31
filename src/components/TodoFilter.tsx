import type { Filter } from '../types'

interface TodoFilterProps {
  value: Filter
  onChange: (filter: Filter) => void
}

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'done', label: '완료' },
]

export function TodoFilter({ value, onChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-md px-3 py-1 text-sm ${
            value === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
