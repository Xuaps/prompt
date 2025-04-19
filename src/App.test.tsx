import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the main page with prompt list and create button', () => {
    render(<App />)
    
    // Check if the main elements are rendered
    expect(screen.getByText('Prompt Manager')).toBeInTheDocument()
    expect(screen.getByTestId('create-prompt-button')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-list')).toBeInTheDocument()
    
    // Check if the sample prompt is rendered
    expect(screen.getByText('Sample Prompt')).toBeInTheDocument()
    expect(screen.getByText('This is a sample prompt content')).toBeInTheDocument()
  })

  it('navigates to the create form when button is clicked', () => {
    render(<App />)
    
    // Click the create button
    fireEvent.click(screen.getByTestId('create-prompt-button'))
    
    // Check if the form is rendered
    expect(screen.getByTestId('prompt-title-input')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-content-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-prompt-button')).toBeInTheDocument()
    
    // Check if the create button is not visible
    expect(screen.queryByTestId('create-prompt-button')).not.toBeInTheDocument()
  })

  it('returns to the list after creating a prompt', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Click the create button
    await user.click(screen.getByTestId('create-prompt-button'))
    
    // Fill in the form
    await user.type(screen.getByTestId('prompt-title-input'), 'New Test Prompt')
    await user.type(screen.getByTestId('prompt-content-input'), 'This is a new test prompt')
    
    // Submit the form
    await user.click(screen.getByTestId('submit-prompt-button'))
    
    // Check if we're back to the list view
    expect(screen.getByTestId('create-prompt-button')).toBeInTheDocument()
    expect(screen.queryByTestId('prompt-title-input')).not.toBeInTheDocument()
    
    // Check if the new prompt is in the list
    expect(screen.getByText('New Test Prompt')).toBeInTheDocument()
    expect(screen.getByText('This is a new test prompt')).toBeInTheDocument()
  })
}) 