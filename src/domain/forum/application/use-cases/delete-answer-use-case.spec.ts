import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer-use-case'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able delete a answer', async () => {
    const _makeAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('authorid-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    inMemoryAnswersRepository.create(_makeAnswer)

    await sut.execute({
      answerId: 'answer-01',
      authorId: 'authorid-01',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const _makeAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('authorid-01'),
      },
      new UniqueEntityID('answer-01'),
    )

    inMemoryAnswersRepository.create(_makeAnswer)

    const result = await sut.execute({
      answerId: 'answer-01',
      authorId: 'authorid-02',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
