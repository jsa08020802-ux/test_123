import { useState } from 'react'
import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string, dueDate?: string) => void
  onDelete: (id: string) => void
}

function isOverdue(dueDate: string | undefined, done: boolean) {
  if (!dueDate || done) return false
  const today = new Date().toISOString().slice(0, 10)
  return dueDate < today
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(todo.text)
  const [draftDueDate, setDraftDueDate] = useState(todo.dueDate ?? '')

  function finishEdit() {
    onEdit(todo.id, draftText, draftDueDate)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
        <input
          type="text"
          value={draftText}
          autoFocus
          onChange={(e) => setDraftText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && finishEdit()}
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-2 py-1 outline-none focus:border-blue-500"
        />
        <input
          type="date"
          value={draftDueDate}
          onChange={(e) => setDraftDueDate(e.target.value)}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-600 outline-none focus:border-blue-500"
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

  const overdue = isOverdue(todo.dueDate, todo.done)

  return (
    <li className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4"
      />
      <div className="flex flex-1 flex-col">
        <span className={todo.done ? 'text-slate-400 line-through' : 'text-slate-800'}>
          {todo.text}
        </span>
        {todo.dueDate && (
          <span className={`text-xs ${overdue ? 'text-red-500' : 'text-slate-400'}`}>
            마감일: {todo.dueDate}
            {overdue && ' (기한 지남)'}
          </span>
        )}
      </div>
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
