import { Prompt } from '../types'

interface PromptListProps {
  prompts: Prompt[]
}

export function PromptList({ prompts }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div data-testid="prompt-list" className="text-center py-8 text-gray-500">
        No prompts yet. Click "Create New Prompt" to get started.
      </div>
    )
  }

  return (
    <div data-testid="prompt-list" className="space-y-4">
      {prompts.map(prompt => (
        <div key={prompt.id} className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{prompt.title}</h2>
          <p className="mt-2">{prompt.content}</p>
        </div>
      ))}
    </div>
  )
} 