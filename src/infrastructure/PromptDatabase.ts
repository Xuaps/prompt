import Dexie, { Table } from 'dexie'

interface PromptTable extends Table {
  id?: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export class PromptDatabase extends Dexie {
  prompts!: Table<PromptTable>

  constructor() {
    super('PromptManager')
    this.version(1).stores({
      prompts: '++id, title, createdAt, updatedAt'
    })
  }
} 