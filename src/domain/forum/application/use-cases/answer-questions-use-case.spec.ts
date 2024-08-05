import { AnswerQuestionsUseCase } from './answer-questions-use-case'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswerQuestions: AnswerRepository = {
  create: async function (data: Answer) {},
}

test('create an answer', async () => {
  const answerQuestionsUseCase = new AnswerQuestionsUseCase(fakeAnswerQuestions)

  const createAnswer = await answerQuestionsUseCase.execute({
    content: 'nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(createAnswer.content).toEqual('nova resposta')
})
