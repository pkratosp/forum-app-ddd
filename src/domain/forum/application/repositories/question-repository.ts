import { Questions } from '../../enterprise/entities/questions'

export interface QuestionRepository {
  create(question: Questions): Promise<void>
}
