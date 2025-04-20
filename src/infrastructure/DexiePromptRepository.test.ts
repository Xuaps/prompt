import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { DexiePromptRepository } from './DexiePromptRepository'
import { Prompt } from '../domain/Prompt'
import { PromptMother } from '../test/helpers/PromptMother'

describe('DexiePromptRepository', () => {
  let repository: DexiePromptRepository

  beforeEach(() => {
    repository = new DexiePromptRepository()
  })

  afterEach(async () => {
    const db = (repository as any).db
    await db.prompts.clear()
    await db.close()
  })

  it('should save and retrieve a prompt', async () => {
    const prompt = Prompt.create('Test Prompt', 'Test Content')
    const savedPrompt = await repository.save(prompt)
    
    expect(savedPrompt.id).not.toBeNull()
    expect(savedPrompt.title).toBe('Test Prompt')
    expect(savedPrompt.content).toBe('Test Content')

    const retrievedPrompt = await repository.getById(savedPrompt.id!)
    expect(retrievedPrompt).toEqual(savedPrompt)
  })

  it('should update an existing prompt', async () => {
    const prompt = Prompt.create('Test Prompt', 'Test Content')
    const savedPrompt = await repository.save(prompt)
    
    const updatedPrompt = savedPrompt.update(savedPrompt.title, 'Updated Content')
    
    const result = await repository.save(updatedPrompt)
    
    expect(result.content).toBe('Updated Content')
    
    const retrievedPrompt = await repository.getById(result.id!)
    expect(retrievedPrompt).toEqual(result)
  })

  it('should delete a prompt', async () => {
    const prompt = Prompt.create('Test Prompt', 'Test Content')
    const savedPrompt = await repository.save(prompt)
    
    await repository.delete(savedPrompt.id!)
    
    const retrievedPrompt = await repository.getById(savedPrompt.id!)
    expect(retrievedPrompt).toBeNull()
  })

  it('should search prompts by title and content', async () => {
    const prompt1 = await repository.save(Prompt.create('Test Prompt', 'Content 1'))
    const prompt2 = await repository.save(Prompt.create('Another Prompt', 'Test Content'))
    
    const searchResults = await repository.search('test')
    expect(searchResults).toHaveLength(2)
    expect(searchResults).toContainEqual(prompt1)
    expect(searchResults).toContainEqual(prompt2)
  })

  it('should return all prompts', async () => {
    const prompt1 = await repository.save(Prompt.create('Prompt 1', 'Content 1'))
    const prompt2 = await repository.save(Prompt.create('Prompt 2', 'Content 2'))
    
    const allPrompts = await repository.getAll()
    expect(allPrompts).toHaveLength(2)
    expect(allPrompts).toContainEqual(prompt1)
    expect(allPrompts).toContainEqual(prompt2)
  })
}) 