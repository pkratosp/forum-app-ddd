import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question-use-case'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able delte a question', async () => {
    const _makeQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorid-01'),
      },
      new UniqueEntityID('questionid-01'),
    )

    inMemoryQuestionsRepository.create(_makeQuestion)

    await sut.execute({
      authorId: 'authorid-01',
      questionId: 'questionid-01',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delte a question from another user', async () => {
    const _makeQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorid-01'),
      },
      new UniqueEntityID('questionid-01'),
    )

    inMemoryQuestionsRepository.create(_makeQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'authorid-02',
        questionId: 'questionid-01',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
