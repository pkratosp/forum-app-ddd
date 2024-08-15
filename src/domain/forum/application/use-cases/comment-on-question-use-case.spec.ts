import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-questions-comment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question-use-case'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsCommentRepository: InMemoryQuestionsCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question use case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionsCommentRepository =
      new InMemoryQuestionsCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      content: 'content comment',
      questionId: question.id.toString(),
    })

    expect(inMemoryQuestionsCommentRepository.items[0].content).toEqual(
      'content comment',
    )
  })
})
