import { describe, it, expect } from 'vitest'
import { Prompt } from './Prompt'

describe('Prompt', () => {
  describe('validation', () => {
    it('throws error when title is empty', () => {
      expect(() => Prompt.create('', 'content')).toThrow('Title is required')
      expect(() => Prompt.create('   ', 'content')).toThrow('Title is required')
    })

    it('throws error when title is too long', () => {
      const longTitle = 'a'.repeat(101)
      expect(() => Prompt.create(longTitle, 'content')).toThrow('Title must be less than 100 characters')
    })

    it('throws error when content is empty', () => {
      expect(() => Prompt.create('title', '')).toThrow('Content is required')
      expect(() => Prompt.create('title', '   ')).toThrow('Content is required')
    })

    it('throws error when content is too long', () => {
      const longContent = 'a'.repeat(10001)
      expect(() => Prompt.create('title', longContent)).toThrow('Content must be less than 10000 characters')
    })

    it('creates a valid prompt', () => {
      const prompt = Prompt.create('Test Title', 'Test Content')
      expect(prompt.title).toBe('Test Title')
      expect(prompt.content).toBe('Test Content')
      expect(prompt.id).toBeNull()
      expect(prompt.createdAt).toBeInstanceOf(Date)
      expect(prompt.updatedAt).toBeInstanceOf(Date)
    })
  })

  describe('withId', () => {
    it('creates a new prompt with id', () => {
      const prompt = Prompt.create('Test Title', 'Test Content')
      const promptWithId = prompt.withId(1)
      
      expect(promptWithId.id).toBe(1)
      expect(promptWithId.title).toBe(prompt.title)
      expect(promptWithId.content).toBe(prompt.content)
      expect(promptWithId.createdAt).toBe(prompt.createdAt)
      expect(promptWithId.updatedAt).toBe(prompt.updatedAt)
    })
  })

  describe('update', () => {
    it('creates a new prompt with updated fields', async () => {
      const prompt = Prompt.create('Test Title', 'Test Content').withId(1)
      // Add a small delay to ensure timestamps are different
      await new Promise(resolve => setTimeout(resolve, 1))
      const updatedPrompt = prompt.update('New Title', 'New Content')
      
      expect(updatedPrompt.id).toBe(prompt.id)
      expect(updatedPrompt.title).toBe('New Title')
      expect(updatedPrompt.content).toBe('New Content')
      expect(updatedPrompt.createdAt).toBe(prompt.createdAt)
      expect(updatedPrompt.updatedAt).toBeInstanceOf(Date)
      expect(updatedPrompt.updatedAt.getTime()).toBeGreaterThan(prompt.updatedAt.getTime())
    })
  })

  describe('serialization', () => {
    it('converts prompt to JSON', () => {
      const prompt = Prompt.create('Test Title', 'Test Content').withId(1)
      const json = prompt.toJSON()
      
      expect(json).toEqual({
        id: 1,
        title: 'Test Title',
        content: 'Test Content',
        createdAt: prompt.createdAt.toISOString(),
        updatedAt: prompt.updatedAt.toISOString()
      })
    })

    it('creates prompt from JSON', () => {
      const json = {
        id: 1,
        title: 'Test Title',
        content: 'Test Content',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z'
      }
      
      const prompt = Prompt.fromJSON(json)
      
      expect(prompt.id).toBe(1)
      expect(prompt.title).toBe('Test Title')
      expect(prompt.content).toBe('Test Content')
      expect(prompt.createdAt).toEqual(new Date('2024-01-01T00:00:00.000Z'))
      expect(prompt.updatedAt).toEqual(new Date('2024-01-02T00:00:00.000Z'))
    })
  })
}) 