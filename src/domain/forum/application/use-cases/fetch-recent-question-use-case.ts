import { Questions } from '../../enterprise/entities/questions'
import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  page: number
}

interface FetchRecentQuestionUseCaseResponse {
  questions: Questions[]
}

export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: RequestType): Promise<FetchRecentQuestionUseCaseResponse> {
    const find = await this.questionRepository.findManyRecent({ page })

    return {
      questions: find,
    }
  }
}
