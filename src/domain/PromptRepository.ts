import { Prompt } from './Prompt'

export interface PromptRepository {
  getAll(): Promise<Prompt[]>
  save(prompt: Prompt): Promise<Prompt>
} 