import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Questions[] = []

  async create(question: Questions) {
    this.items.push(question)
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }
}
