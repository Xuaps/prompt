import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PromptList } from './PromptList'
import { Prompt } from '../types'

describe('PromptList', () => {
  it('renders empty state when no prompts are provided', () => {
    render(<PromptList prompts={[]} />)
    
    expect(screen.getByTestId('prompt-list')).toHaveTextContent(
      'No prompts yet. Click "Create New Prompt" to get started.'
    )
  })

  it('renders list of prompts', () => {
    const prompts: Prompt[] = [
      { id: 1, title: 'First Prompt', content: 'First content' },
      { id: 2, title: 'Second Prompt', content: 'Second content' }
    ]
    
    render(<PromptList prompts={prompts} />)
    
    expect(screen.getByText('First Prompt')).toBeInTheDocument()
    expect(screen.getByText('First content')).toBeInTheDocument()
    expect(screen.getByText('Second Prompt')).toBeInTheDocument()
    expect(screen.getByText('Second content')).toBeInTheDocument()
  })
}) 