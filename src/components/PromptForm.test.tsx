import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PromptForm } from './PromptForm'
import userEvent from '@testing-library/user-event'

describe('PromptForm', () => {
  it('renders form fields correctly', () => {
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()

    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Content')).toBeInTheDocument()
    expect(screen.getByText('Save Prompt')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('handles input changes correctly', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()

    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')

    await act(async () => {
      await user.type(titleInput, 'Test Title')
      await user.type(contentInput, 'Test Content')
    })

    expect(titleInput).toHaveValue('Test Title')
    expect(contentInput).toHaveValue('Test Content')
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()

    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const submitButton = screen.getByText('Save Prompt')
    await act(async () => {
      await user.click(submitButton)
    })

    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Content is required')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows validation errors for whitespace-only input', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')
    
    await act(async () => {
      await user.type(titleInput, '   ')
      await user.type(contentInput, '   ')
      await user.click(screen.getByText('Save Prompt'))
    })
    
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Content is required')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('clears validation errors when input is corrected', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    // Submit empty form to trigger validation errors
    await act(async () => {
      await user.click(screen.getByText('Save Prompt'))
    })
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Content is required')).toBeInTheDocument()
    
    // Fill in the form
    await act(async () => {
      await user.type(screen.getByLabelText('Title'), 'Test Title')
      await user.type(screen.getByLabelText('Content'), 'Test Content')
    })
    
    // Errors should be cleared
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Content is required')).not.toBeInTheDocument()
  })

  it('calls onSubmit with form data when submitted with valid input', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()

    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')

    await act(async () => {
      await user.type(titleInput, 'Test Title')
      await user.type(contentInput, 'Test Content')
      await user.click(screen.getByText('Save Prompt'))
    })

    expect(mockOnSubmit).toHaveBeenCalledWith('Test Title', 'Test Content')
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()

    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    await act(async () => {
      await user.click(screen.getByText('Cancel'))
    })
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('clears form fields after successful submission', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()

    render(<PromptForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const titleInput = screen.getByLabelText('Title')
    const contentInput = screen.getByLabelText('Content')

    await act(async () => {
      await user.type(titleInput, 'Test Title')
      await user.type(contentInput, 'Test Content')
      await user.click(screen.getByText('Save Prompt'))
    })

    expect(titleInput).toHaveValue('')
    expect(contentInput).toHaveValue('')
  })
}) 