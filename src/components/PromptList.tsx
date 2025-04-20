import { Prompt } from '../domain/Prompt'

interface PromptData {
  id: number | null
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface PromptListProps {
  prompts: PromptData[]
}

export function PromptList({ prompts }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div 
        data-testid="empty-prompt-list"
        role="status"
        aria-label="No prompts available"
        className="text-center text-gray-500 mt-4"
      >
        No prompts yet. Click "Create New Prompt" to get started.
      </div>
    )
  }

  return (
    <ul 
      data-testid="prompt-list"
      role="list"
      aria-label="List of prompts"
      className="space-y-4 mt-4"
    >
      {prompts.map((prompt) => (
        <li 
          key={prompt.id}
          data-testid={`prompt-item-${prompt.id}`}
          role="listitem"
          className="bg-white shadow rounded-lg p-4"
        >
          <h3 className="text-lg font-medium text-gray-900">{prompt.title}</h3>
          <p className="mt-2 text-gray-600">{prompt.content}</p>
        </li>
      ))}
    </ul>
  )
} 