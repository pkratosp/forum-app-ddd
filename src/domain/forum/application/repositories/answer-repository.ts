import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
  findbyId(id: string): Promise<Answer | null>
  create(data: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
