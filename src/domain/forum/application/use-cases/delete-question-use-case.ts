import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(data: RequestType): Promise<DeleteQuestionUseCaseResponse> {
    const findQuestion = await this.questionRepository.findbyId(data.questionId)

    if (!findQuestion) {
      throw new Error('Question not found')
    }

    if (data.authorId !== findQuestion.authorId.toString()) {
      throw new Error('permission denied')
    }

    await this.questionRepository.delete(findQuestion)

    return {}
  }
}
