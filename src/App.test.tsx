import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { DexiePromptRepository } from './infrastructure/DexiePromptRepository'
import { Prompt } from './domain/Prompt'

describe('App Integration', () => {
  let repository: DexiePromptRepository

  beforeEach(async () => {
    repository = new DexiePromptRepository()
    await repository.clear()
  })

  afterEach(async () => {
    await repository.clear()
  })

  it('shows empty state when no prompts exist', async () => {
    await act(async () => {
      render(<App />)
    })
    
    await waitFor(async () => {
      expect(await screen.findByText(/no prompts yet/i)).toBeInTheDocument()
    })
  })

  it('creates a new prompt and updates the list', async () => {
    const user = userEvent.setup()
    await act(async () => {
      render(<App />)
    })

    // Wait for initial load and click create button
    const createButton = await screen.findByTestId('create-prompt-button')
    await act(async () => {
      await user.click(createButton)
    })

    // Fill form
    const titleInput = await screen.findByLabelText(/title/i)
    const contentInput = await screen.findByLabelText(/content/i)
    await act(async () => {
      await user.type(titleInput, 'New Prompt')
      await user.type(contentInput, 'New Content')
    })
    
    // Submit form
    const submitButton = await screen.findByRole('button', { name: /save/i })
    await act(async () => {
      await user.click(submitButton)
    })

    // Verify UI updates
    await screen.findByText('New Prompt')
    await screen.findByText('New Content')

    // Verify data persistence
    await waitFor(async () => {
      const prompts = await repository.getAll()
      expect(prompts).toHaveLength(1)
      expect(prompts[0].title).toBe('New Prompt')
      expect(prompts[0].content).toBe('New Content')
    })
  })

  it('shows form on create button click and hides on cancel', async () => {
    const user = userEvent.setup()
    await act(async () => {
      render(<App />)
    })

    // Wait for initial load and verify form is not visible
    const createButton = await screen.findByTestId('create-prompt-button')
    expect(screen.queryByTestId('prompt-title-input')).not.toBeInTheDocument()

    // Click create button and verify form appears
    await act(async () => {
      await user.click(createButton)
    })
    await screen.findByTestId('prompt-title-input')

    // Click cancel and verify form disappears
    const cancelButton = await screen.findByRole('button', { name: /cancel/i })
    await act(async () => {
      await user.click(cancelButton)
    })
    await waitFor(() => {
      expect(screen.queryByTestId('prompt-title-input')).not.toBeInTheDocument()
    })
  })

  it('loads existing prompts on mount', async () => {
    // Create a prompt in the database
    const existingPrompt = Prompt.create('Existing Prompt', 'Existing Content')
    await repository.save(existingPrompt)

    await act(async () => {
      render(<App />)
    })

    // Verify prompts are loaded
    await screen.findByText('Existing Prompt')
    await screen.findByText('Existing Content')
  })
}) 