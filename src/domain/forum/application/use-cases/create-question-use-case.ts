import { UniqueEntityID } from '@/core/entities/unique-entity'
import { Questions } from '../../enterprise/entities/questions'
import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Questions
}

export class CreateQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: RequestType): Promise<CreateQuestionUseCaseResponse> {
    const question = Questions.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
