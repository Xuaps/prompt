import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { LocalStoragePromptRepository } from './repositories/PromptRepository'

describe('App Integration', () => {
  let repository: LocalStoragePromptRepository

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    repository = new LocalStoragePromptRepository()
  })

  it('shows empty state when no prompts exist', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/no prompts yet/i)).toBeInTheDocument()
    })
  })

  it('creates a new prompt and updates the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click create button
    await user.click(screen.getByTestId('create-prompt-button'))

    // Fill form
    await user.type(screen.getByLabelText(/title/i), 'New Prompt')
    await user.type(screen.getByLabelText(/content/i), 'New Content')
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /save/i }))

    // Verify UI updates
    await waitFor(() => {
      expect(screen.getByText('New Prompt')).toBeInTheDocument()
      expect(screen.getByText('New Content')).toBeInTheDocument()
    })

    // Verify data persistence
    const storedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]')
    expect(storedPrompts).toHaveLength(1)
    expect(storedPrompts[0]).toEqual({
      id: 1,
      title: 'New Prompt',
      content: 'New Content'
    })
  })

  it('shows form on create button click and hides on cancel', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Initially form should not be visible
    expect(screen.queryByTestId('prompt-title-input')).not.toBeInTheDocument()

    // Click create button
    await user.click(screen.getByTestId('create-prompt-button'))
    expect(screen.getByTestId('prompt-title-input')).toBeInTheDocument()

    // Click cancel
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(screen.queryByTestId('prompt-title-input')).not.toBeInTheDocument()
  })

  it('loads existing prompts on mount', async () => {
    // Setup: Add some prompts to localStorage
    const existingPrompts = [
      { id: 1, title: 'Existing Prompt', content: 'Existing Content' }
    ]
    localStorage.setItem('prompts', JSON.stringify(existingPrompts))

    render(<App />)

    // Verify prompts are loaded
    await waitFor(() => {
      expect(screen.getByText('Existing Prompt')).toBeInTheDocument()
      expect(screen.getByText('Existing Content')).toBeInTheDocument()
    })
  })
}) 