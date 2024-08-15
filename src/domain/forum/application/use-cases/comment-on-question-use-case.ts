import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { QuestionRepository } from '../repositories/question-repository'

type RequestType = {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: RequestType): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findbyId(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId,
      content,
      questionId,
    })

    await this.questionCommentRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
