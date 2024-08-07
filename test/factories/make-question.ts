import { UniqueEntityID } from '@/core/entities/unique-entity'
import {
  Questions,
  QuestionsProps,
} from '@/domain/forum/enterprise/entities/questions'

export function makeQuestion(override: Partial<QuestionsProps> = {}) {
  const createQuestion = Questions.create({
    authorId: new UniqueEntityID(),
    title: 'example question',
    content: 'question slug',
    ...override,
  })

  return createQuestion
}
