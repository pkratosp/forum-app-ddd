import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'
import { AnswerRepository } from '../repositories/answer-repository'

type RequestType = {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerCommentRepository: AnswerCommentRepository,
    private answerRepository: AnswerRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: RequestType): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findbyId(answerId)

    if (!answer) {
      throw new Error('Question not found')
    }

    const answerComment = AnswerComment.create({
      authorId,
      content,
      answerId,
    })

    await this.answerCommentRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
