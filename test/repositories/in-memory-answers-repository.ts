import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async findbyId(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(data: Answer) {
    this.items.push(data)
  }

  async delete(answer: Answer) {
    const findIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(findIndex, 1)
  }
}
