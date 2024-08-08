import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {}

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
      throw new Error('Question not found')
    }

    if (findQuestion.authorId.toString() !== authorId) {
      throw new Error('Permission denied')
    }

    findQuestion.title = title
    findQuestion.content = content

    await this.questionRepository.save(findQuestion)

    return {}
  }
}
