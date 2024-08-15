import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  create(data: AnswerComment): Promise<void>
}
