import { Questions } from '../../enterprise/entities/questions'

export interface QuestionRepository {
  findbyId(id: string): Promise<Questions | null>
  findBySlug(slug: string): Promise<Questions | null>
  create(question: Questions): Promise<void>
  delete(question: Questions): Promise<void>
}
