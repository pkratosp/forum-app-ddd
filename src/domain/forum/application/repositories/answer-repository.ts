import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
  create(data: Answer): Promise<void>
}
