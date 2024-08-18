import { Either, left, right } from '@/core/either'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

type RequestType = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class EditQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    questionId,
    title,
  }: RequestType): Promise<EditQuestionUseCaseResponse> {
    const findQuestion = await this.questionRepository.findbyId(questionId)

    if (!findQuestion) {
      return left(new ResourceNotFoundError())
    }

    if (findQuestion.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    findQuestion.title = title
    findQuestion.content = content

    await this.questionRepository.save(findQuestion)

    return right({})
  }
}
