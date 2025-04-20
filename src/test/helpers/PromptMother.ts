import { Prompt } from '../../domain/Prompt'

export class PromptMother {
  static create(overrides: Partial<Prompt> = {}): Prompt {
    const defaultPrompt = new Prompt(
      null,
      'Test Prompt',
      'This is a test prompt content'
    )

    if (overrides.id !== undefined) {
      return new Prompt(
        overrides.id,
        defaultPrompt.title,
        defaultPrompt.content,
        defaultPrompt.createdAt,
        defaultPrompt.updatedAt
      )
    }
    
    if (overrides.title !== undefined) {
      return defaultPrompt.update(overrides.title, defaultPrompt.content)
    }
    
    if (overrides.content !== undefined) {
      return new Prompt(
        defaultPrompt.id,
        defaultPrompt.title,
        overrides.content,
        defaultPrompt.createdAt,
        new Date()
      )
    }

    return defaultPrompt
  }

  static createList(count: number): Prompt[] {
    return Array.from({ length: count }, (_, index) =>
      PromptMother.create({
        id: index + 1,
        title: `Test Prompt ${index + 1}`,
        content: `This is test prompt content ${index + 1}`,
      })
    )
  }
} 