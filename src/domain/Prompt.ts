export class Prompt {
  constructor(
    public readonly id: number | null,
    public readonly title: string,
    public readonly content: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {
    this.validate()
  }

  private validate(): void {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Title is required')
    }

    if (this.title.length > 100) {
      throw new Error('Title must be less than 100 characters')
    }

    if (!this.content || this.content.trim().length === 0) {
      throw new Error('Content is required')
    }

    if (this.content.length > 10000) {
      throw new Error('Content must be less than 10000 characters')
    }
  }

  update(title: string, content: string): Prompt {
    return new Prompt(this.id, title, content, this.createdAt, new Date())
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }

  static fromJSON(json: any): Prompt {
    return new Prompt(
      json.id,
      json.title,
      json.content,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    )
  }
} 