import { Prompt } from '../types'

export interface PromptRepository {
  getAll(): Promise<Prompt[]>
  save(prompt: Omit<Prompt, 'id'>): Promise<Prompt>
}

export class LocalStoragePromptRepository implements PromptRepository {
  private readonly storageKey = 'prompts'

  async getAll(): Promise<Prompt[]> {
    const storedPrompts = localStorage.getItem(this.storageKey)
    return storedPrompts ? JSON.parse(storedPrompts) : []
  }

  async save(prompt: Omit<Prompt, 'id'>): Promise<Prompt> {
    const prompts = await this.getAll()
    const newPrompt: Prompt = {
      ...prompt,
      id: prompts.length + 1
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify([...prompts, newPrompt]))
    return newPrompt
  }
} 