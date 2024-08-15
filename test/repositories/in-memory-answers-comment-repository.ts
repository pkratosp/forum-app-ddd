import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswersCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(data: AnswerComment) {
    this.items.push(data)
  }
}
