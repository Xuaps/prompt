import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PromptForm } from './PromptForm'

describe('PromptForm', () => {
  it('renders form fields and buttons', () => {
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    expect(screen.getByTestId('prompt-title-input')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-content-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-prompt-button')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('handles input changes', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    const titleInput = screen.getByTestId('prompt-title-input')
    const contentInput = screen.getByTestId('prompt-content-input')
    
    await user.type(titleInput, 'Test Title')
    await user.type(contentInput, 'Test Content')
    
    expect(titleInput).toHaveValue('Test Title')
    expect(contentInput).toHaveValue('Test Content')
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    await user.click(screen.getByTestId('submit-prompt-button'))
    
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Content is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    await user.type(screen.getByTestId('prompt-title-input'), 'Test Title')
    await user.type(screen.getByTestId('prompt-content-input'), 'Test Content')
    await user.click(screen.getByTestId('submit-prompt-button'))
    
    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content'
    })
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    
    expect(onCancel).toHaveBeenCalled()
  })

  it('clears form fields after successful submission', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    const titleInput = screen.getByTestId('prompt-title-input')
    const contentInput = screen.getByTestId('prompt-content-input')
    
    await user.type(titleInput, 'Test Title')
    await user.type(contentInput, 'Test Content')
    await user.click(screen.getByTestId('submit-prompt-button'))
    
    expect(titleInput).toHaveValue('')
    expect(contentInput).toHaveValue('')
  })

  it('handles whitespace-only input validation', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    const titleInput = screen.getByTestId('prompt-title-input')
    const contentInput = screen.getByTestId('prompt-content-input')
    
    await user.type(titleInput, '   ')
    await user.type(contentInput, '  ')
    await user.click(screen.getByTestId('submit-prompt-button'))
    
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Content is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('clears validation errors when input is corrected', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onCancel = vi.fn()
    
    render(<PromptForm onSubmit={onSubmit} onCancel={onCancel} />)
    
    // Submit empty form to trigger validation errors
    await user.click(screen.getByTestId('submit-prompt-button'))
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    
    // Fix the title input
    await user.type(screen.getByTestId('prompt-title-input'), 'Test Title')
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
  })
}) 