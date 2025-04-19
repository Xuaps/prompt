import { useState } from 'react'

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [prompts, setPrompts] = useState([
    { id: 1, title: 'Sample Prompt', content: 'This is a sample prompt content' }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const titleInput = form.elements.namedItem('title') as HTMLInputElement
    const contentInput = form.elements.namedItem('content') as HTMLTextAreaElement
    
    const newPrompt = {
      id: prompts.length + 1,
      title: titleInput.value,
      content: contentInput.value
    }
    
    setPrompts([...prompts, newPrompt])
    setShowCreateForm(false)
    form.reset()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prompt Manager</h1>
      
      {!showCreateForm ? (
        <button 
          data-test="create-prompt-button"
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Create New Prompt
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              data-test="prompt-title-input"
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="content" className="block mb-1">Content</label>
            <textarea
              data-test="prompt-content-input"
              id="content"
              name="content"
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>
          <button
            data-test="submit-prompt-button"
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Prompt
          </button>
        </form>
      )}
      
      <div data-test="prompt-list" className="space-y-4">
        {prompts.map(prompt => (
          <div key={prompt.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{prompt.title}</h2>
            <p className="mt-2">{prompt.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
