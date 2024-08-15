import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentRepository {
  create(data: QuestionComment): Promise<void>
}
