import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LocalStoragePromptRepository } from './PromptRepository'
import { Prompt } from '../types'

describe('LocalStoragePromptRepository', () => {
  let repository: LocalStoragePromptRepository
  let localStorageMock: { [key: string]: string }

  beforeEach(() => {
    localStorageMock = {}
    
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value
      }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn()
    }
    
    repository = new LocalStoragePromptRepository()
  })

  describe('getAll', () => {
    it('returns empty array when no prompts are stored', async () => {
      const prompts = await repository.getAll()
      expect(prompts).toEqual([])
      expect(localStorage.getItem).toHaveBeenCalledWith('prompts')
    })

    it('returns stored prompts', async () => {
      const storedPrompts: Prompt[] = [
        { id: 1, title: 'Test 1', content: 'Content 1' },
        { id: 2, title: 'Test 2', content: 'Content 2' }
      ]
      localStorageMock['prompts'] = JSON.stringify(storedPrompts)

      const prompts = await repository.getAll()
      expect(prompts).toEqual(storedPrompts)
      expect(localStorage.getItem).toHaveBeenCalledWith('prompts')
    })
  })

  describe('save', () => {
    it('saves new prompt with generated id', async () => {
      const newPrompt = { title: 'New Prompt', content: 'New Content' }
      const savedPrompt = await repository.save(newPrompt)

      expect(savedPrompt).toEqual({
        ...newPrompt,
        id: 1
      })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'prompts',
        JSON.stringify([savedPrompt])
      )
    })

    it('increments id based on existing prompts', async () => {
      const existingPrompts: Prompt[] = [
        { id: 1, title: 'Test 1', content: 'Content 1' }
      ]
      localStorageMock['prompts'] = JSON.stringify(existingPrompts)

      const newPrompt = { title: 'New Prompt', content: 'New Content' }
      const savedPrompt = await repository.save(newPrompt)

      expect(savedPrompt).toEqual({
        ...newPrompt,
        id: 2
      })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'prompts',
        JSON.stringify([...existingPrompts, savedPrompt])
      )
    })

    it('preserves existing prompts when saving new one', async () => {
      const existingPrompts: Prompt[] = [
        { id: 1, title: 'Test 1', content: 'Content 1' }
      ]
      localStorageMock['prompts'] = JSON.stringify(existingPrompts)

      const newPrompt = { title: 'New Prompt', content: 'New Content' }
      await repository.save(newPrompt)

      const allPrompts = await repository.getAll()
      expect(allPrompts).toHaveLength(2)
      expect(allPrompts[0]).toEqual(existingPrompts[0])
      expect(allPrompts[1].title).toBe(newPrompt.title)
      expect(allPrompts[1].content).toBe(newPrompt.content)
    })
  })
}) 