import { useState, useEffect } from 'react'
import { PromptList } from './components/PromptList'
import { PromptForm } from './components/PromptForm'
import { Prompt } from './types'
import { LocalStoragePromptRepository } from './repositories/PromptRepository'

const promptRepository = new LocalStoragePromptRepository()

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [prompts, setPrompts] = useState<Prompt[]>([])

  useEffect(() => {
    loadPrompts()
  }, [])

  const loadPrompts = async () => {
    const loadedPrompts = await promptRepository.getAll()
    setPrompts(loadedPrompts)
  }

  const handleSubmit = async (newPrompt: Omit<Prompt, 'id'>) => {
    const savedPrompt = await promptRepository.save(newPrompt)
    setPrompts([...prompts, savedPrompt])
    setShowCreateForm(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prompt Manager</h1>
      
      {!showCreateForm ? (
        <button 
          data-testid="create-prompt-button"
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Create New Prompt
        </button>
      ) : (
        <PromptForm 
          onSubmit={handleSubmit}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
      
      <PromptList prompts={prompts} />
    </div>
  )
}

export default App
