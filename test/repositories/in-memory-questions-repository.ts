import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Questions[] = []

  async findbyId(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Questions) {
    this.items.push(question)
  }

  async save(question: Questions) {
    const findIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[findIndex] = question
  }

  async delete(question: Questions) {
    const findIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(findIndex, 1)
  }
}
