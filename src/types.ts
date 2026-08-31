export interface Todo {
  id: string
  text: string
  done: boolean
  dueDate?: string
}

export type Filter = 'all' | 'active' | 'done'
