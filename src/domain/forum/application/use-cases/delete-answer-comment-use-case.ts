import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

type RequestType = {
  authorId: string
  answerId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    authorId,
  }: RequestType): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answer = await this.answerCommentRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not alowed')
    }

    await this.answerCommentRepository.delete(answer)

    return {}
  }
}
