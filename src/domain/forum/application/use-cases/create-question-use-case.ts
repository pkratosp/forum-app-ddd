import { UniqueEntityID } from '@/core/entities/unique-entity'
import { Questions } from '../../enterprise/entities/questions'
import { QuestionRepository } from '../repositories/question-repository'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { Either, right } from '@/core/either'

type RequestType = {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Questions
  }
>

export class CreateQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
    attachmentsIds,
  }: RequestType): Promise<CreateQuestionUseCaseResponse> {
    const question = Questions.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    const questionAttachment = attachmentsIds.map((attachmentid) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentid),
        questionId: question.id,
      })
    })

    question.attachments = questionAttachment
    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
