import { Either, left, right } from "@/core/either";
import { AnswerRepository } from "../repositories/answer-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity";
import { Answer } from "../../enterprise/entities/answer";

type RequestType = {
    content: string
    authorId: string
    answerId: string
    attachments: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer: Answer
}>

export class EditAnswerUseCase {
    constructor(
        private readonly answerRepository: AnswerRepository,
        private readonly answerAttachmentsRepository: AnswerAttachmentsRepository
    ) {}

    async execute({
        answerId,
        attachments,
        authorId,
        content
    }: RequestType): Promise<EditAnswerUseCaseResponse> {
       const answer = await this.answerRepository.findbyId(answerId)

       if(!answer) {
        return left(new ResourceNotFoundError())
       }

       if(answer.authorId.toString() !== authorId) {
        return left(new NotAllowedError())
       }

       const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

       const answerAttachmentList = new AnswerAttachmentList(
        currentAnswerAttachments
       )

       const answerAttachments = attachments.map((attachment) => {
        return AnswerAttachment.create({
            answerId: answer.id,
            attachmentId: new UniqueEntityID(attachment)
        })
       })

       answerAttachmentList.update(answerAttachments)

       answer.content = content
       answer.attachments = answerAttachmentList

       return right({
        answer
       })
    }
}