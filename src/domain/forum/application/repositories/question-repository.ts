import { Questions } from '../../enterprise/entities/questions'

export interface QuestionRepository {
  findBySlug(slug: string): Promise<Questions | null>
  create(question: Questions): Promise<void>
}
