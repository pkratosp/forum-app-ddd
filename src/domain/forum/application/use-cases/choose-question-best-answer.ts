import { Questions } from '../../enterprise/entities/questions'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerResponse {
  question: Questions
}

export class ChooseQuestionBestAnswer {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: RequestType): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answerRepository.findbyId(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findbyId(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
