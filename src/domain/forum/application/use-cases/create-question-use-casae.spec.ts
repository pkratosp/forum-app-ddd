import { Questions } from '../../enterprise/entities/questions'
import { QuestionRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question-use-case'

const fakeCreateQuestion: QuestionRepository = {
  create: async function (data: Questions) {},
}

test('create a question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(fakeCreateQuestion)

  const createQuestion = await createQuestionUseCase.execute({
    authorId: '1',
    content: 'conteudo da mensagem',
    title: 'questao',
  })

  expect(createQuestion.question.id).toBeTruthy()
})
