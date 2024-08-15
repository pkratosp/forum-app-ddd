import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionsCommentRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []

  async create(data: QuestionComment) {
    this.items.push(data)
  }
}
