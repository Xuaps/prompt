import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PromptList } from './PromptList'

interface PromptData {
  id: number | null
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

describe('PromptList', () => {
  it('renders empty state when no prompts', () => {
    render(<PromptList prompts={[]} />)
    expect(screen.getByTestId('empty-prompt-list')).toBeInTheDocument()
    expect(screen.getByText('No prompts yet. Click "Create New Prompt" to get started.')).toBeInTheDocument()
  })

  it('renders list of prompts', () => {
    const now = new Date()
    const prompts: PromptData[] = [
      {
        id: 1,
        title: 'Test Prompt 1',
        content: 'Content 1',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        title: 'Test Prompt 2',
        content: 'Content 2',
        createdAt: now,
        updatedAt: now
      }
    ]
    
    render(<PromptList prompts={prompts} />)
    
    expect(screen.getByTestId('prompt-list')).toBeInTheDocument()
    expect(screen.getByText('Test Prompt 1')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Test Prompt 2')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('renders prompts with special characters in title and content', () => {
    const now = new Date()
    const prompts: PromptData[] = [
      { 
        id: 1, 
        title: 'Test & Prompt', 
        content: 'Content <script>alert("test")</script>',
        createdAt: now,
        updatedAt: now
      }
    ]
    render(<PromptList prompts={prompts} />)
    expect(screen.getByText('Test & Prompt')).toBeInTheDocument()
    expect(screen.getByText('Content <script>alert("test")</script>')).toBeInTheDocument()
  })

  it('maintains accessibility with empty state', () => {
    render(<PromptList prompts={[]} />)
    expect(screen.getByTestId('empty-prompt-list')).toHaveAttribute('role', 'status')
  })

  it('maintains accessibility with prompt list', () => {
    const now = new Date()
    const prompts: PromptData[] = [
      {
        id: 1,
        title: 'Test Prompt',
        content: 'Content',
        createdAt: now,
        updatedAt: now
      }
    ]
    render(<PromptList prompts={prompts} />)
    expect(screen.getByTestId('prompt-list')).toHaveAttribute('role', 'list')
  })

  it('renders prompts in correct order', () => {
    const now = new Date()
    const prompts: PromptData[] = [
      { 
        id: 2, 
        title: 'Second Prompt', 
        content: 'Second content',
        createdAt: now,
        updatedAt: now
      },
      { 
        id: 1, 
        title: 'First Prompt', 
        content: 'First content',
        createdAt: now,
        updatedAt: now
      }
    ]
    render(<PromptList prompts={prompts} />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Second Prompt')
    expect(items[1]).toHaveTextContent('First Prompt')
  })
}) 