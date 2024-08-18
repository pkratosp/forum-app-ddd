import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question-use-case'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able edit a question', async () => {
    const _makeQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorid-01'),
      },
      new UniqueEntityID('questionid-01'),
    )

    inMemoryQuestionsRepository.create(_makeQuestion)

    await sut.execute({
      authorId: 'authorid-01',
      content: 'edit content',
      questionId: 'questionid-01',
      title: 'edit title',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'edit title',
      content: 'edit content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const _makeQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('authorid-01'),
      },
      new UniqueEntityID('questionid-01'),
    )

    inMemoryQuestionsRepository.create(_makeQuestion)

    const result = await sut.execute({
      authorId: 'authorid-02',
      content: 'edit content',
      questionId: 'questionid-01',
      title: 'edit title',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
