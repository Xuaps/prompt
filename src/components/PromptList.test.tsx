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

  it('renders prompts with special characters in title and content', () => {
    const prompts: Prompt[] = [
      { 
        id: 1, 
        title: 'Special & Characters < > " \'', 
        content: 'Content with <script>alert("test")</script>'
      }
    ]
    
    render(<PromptList prompts={prompts} />)
    
    expect(screen.getByText('Special & Characters < > " \'')).toBeInTheDocument()
    expect(screen.getByText('Content with <script>alert("test")</script>')).toBeInTheDocument()
  })

  it('maintains accessibility with aria attributes', () => {
    render(<PromptList prompts={[]} />)
    
    const list = screen.getByTestId('prompt-list')
    expect(list).toHaveAttribute('role', 'list')
    expect(list).toHaveAttribute('aria-label', 'Prompts')
  })

  it('renders prompts in correct order', () => {
    const prompts: Prompt[] = [
      { id: 2, title: 'Second Prompt', content: 'Second content' },
      { id: 1, title: 'First Prompt', content: 'First content' },
      { id: 3, title: 'Third Prompt', content: 'Third content' }
    ]
    
    render(<PromptList prompts={prompts} />)
    
    const renderedPrompts = screen.getAllByRole('listitem')
    expect(renderedPrompts).toHaveLength(3)
    expect(renderedPrompts[0]).toHaveTextContent('Second Prompt')
    expect(renderedPrompts[1]).toHaveTextContent('First Prompt')
    expect(renderedPrompts[2]).toHaveTextContent('Third Prompt')
  })
}) 