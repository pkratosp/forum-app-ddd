import { UniqueEntityID } from '@/core/entities/unique-entity'
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

type RequestType = {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionsUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({ content, instructorId, questionId }: RequestType) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
