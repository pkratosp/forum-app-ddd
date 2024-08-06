import { AnswerQuestionsUseCase } from './answer-questions-use-case'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionsUseCase

describe('Answer questions', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionsUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer question', async () => {
    const createAnswer = await sut.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(createAnswer.content).toEqual('nova resposta')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(createAnswer.id)
  })
})
