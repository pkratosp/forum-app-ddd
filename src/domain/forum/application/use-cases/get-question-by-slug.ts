import { Questions } from '../../enterprise/entities/questions'
import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  slug: string
}

interface GetQuestionBySlugResponse {
  question: Questions
}

export class GetQuestionBySlug {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({ slug }: RequestType): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}
