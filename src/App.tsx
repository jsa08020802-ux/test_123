import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos()
  const remaining = todos.filter((todo) => !todo.done).length

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-slate-800">To-Do</h1>
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
        {todos.length > 0 && (
          <p className="text-sm text-slate-400">남은 할 일: {remaining}개</p>
        )}
      </div>
    </div>
  )
}

export default App
