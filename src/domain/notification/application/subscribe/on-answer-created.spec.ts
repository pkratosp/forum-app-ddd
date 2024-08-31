import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswersAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository

describe('on answer create', () => {

    beforeEach(() => {
        inMemoryAnswersAttachmentsRepository = new InMemoryAnswersAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
    })

    it('should send a notification when an answer is created', () => {
       const onAnswerCreated = new OnAnswerCreated()
    
        const answer = makeAnswer()

        inMemoryAnswersRepository.create(answer)
    })
})