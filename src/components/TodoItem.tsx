import { useState } from 'react'
import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function finishEdit() {
    onEdit(todo.id, draft)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && finishEdit()}
          className="flex-1 rounded-md border border-slate-300 px-2 py-1 outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={finishEdit}
          className="text-sm text-blue-600 hover:underline"
        >
          저장
        </button>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4"
      />
      <span
        className={`flex-1 ${todo.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="text-sm text-slate-500 hover:underline"
      >
        수정
      </button>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="text-sm text-red-500 hover:underline"
      >
        삭제
      </button>
    </li>
  )
}
