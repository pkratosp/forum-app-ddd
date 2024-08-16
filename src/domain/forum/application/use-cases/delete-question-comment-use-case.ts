import { QuestionCommentRepository } from '../repositories/question-comment-repository'

type RequestType = {
  authorId: string
  questionId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionId,
  }: RequestType): Promise<DeleteQuestionCommentUseCaseResponse> {
    const question = await this.questionCommentRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not alowed')
    }

    await this.questionCommentRepository.delete(question)

    return {}
  }
}
