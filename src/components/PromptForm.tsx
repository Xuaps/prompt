import { useState } from 'react'
import { Prompt } from '../types'

interface PromptFormProps {
  onSubmit: (prompt: Omit<Prompt, 'id'>) => void
  onCancel: () => void
}

export function PromptForm({ onSubmit, onCancel }: PromptFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({ title, content })
      setTitle('')
      setContent('')
      setErrors({})
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }))
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="title" className="block mb-1">Title</label>
        <input
          data-testid="prompt-title-input"
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div className="mb-2">
        <label htmlFor="content" className="block mb-1">Content</label>
        <textarea
          data-testid="prompt-content-input"
          id="content"
          value={content}
          onChange={handleContentChange}
          className={`w-full p-2 border rounded ${errors.content ? 'border-red-500' : ''}`}
          rows={4}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          data-testid="submit-prompt-button"
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Prompt
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
} 