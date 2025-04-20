import Dexie from 'dexie'
import { Prompt } from '../domain/Prompt'
import { PromptRepository } from '../domain/PromptRepository'

interface PromptTable {
  id?: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

class PromptDatabase extends Dexie {
  prompts!: Dexie.Table<PromptTable, number>

  constructor() {
    super('PromptManager')
    this.version(1).stores({
      prompts: '++id, title, createdAt, updatedAt'
    })
  }
}

export class DexiePromptRepository implements PromptRepository {
  protected db: PromptDatabase

  constructor() {
    this.db = new PromptDatabase()
  }

  async getAll(): Promise<Prompt[]> {
    const prompts = await this.db.prompts.toArray()
    return prompts.map(p => Prompt.fromJSON(p))
  }

  async getById(id: number): Promise<Prompt | null> {
    const prompt = await this.db.prompts.get(id)
    return prompt ? Prompt.fromJSON(prompt) : null
  }

  async save(prompt: Prompt): Promise<Prompt> {
    const { id, ...promptData } = prompt.toJSON()
    if (prompt.id === null) {
      const newId = await this.db.prompts.add(promptData as PromptTable)
      return prompt.withId(newId)
    } else {
      await this.db.prompts.update(prompt.id, promptData as PromptTable)
      return prompt
    }
  }

  async delete(id: number): Promise<void> {
    await this.db.prompts.delete(id)
  }

  async search(query: string): Promise<Prompt[]> {
    const prompts = await this.db.prompts
      .filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.content.toLowerCase().includes(query.toLowerCase())
      )
      .toArray()
    return prompts.map(p => Prompt.fromJSON(p))
  }

  async clear(): Promise<void> {
    await this.db.prompts.clear()
  }
} 