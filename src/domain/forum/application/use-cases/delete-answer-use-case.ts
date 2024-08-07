import { AnswerRepository } from '../repositories/answer-repository'

type RequestType = {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(data: RequestType): Promise<DeleteAnswerUseCaseResponse> {
    const findQuestion = await this.answerRepository.findbyId(data.answerId)

    if (!findQuestion) {
      throw new Error('Question not found')
    }

    if (data.authorId !== findQuestion.authorId.toString()) {
      throw new Error('permission denied')
    }

    await this.answerRepository.delete(findQuestion)

    return {}
  }
}
