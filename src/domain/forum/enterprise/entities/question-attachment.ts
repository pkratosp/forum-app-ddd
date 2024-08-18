import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity";

interface QuestionAttachmentProps {
    questionId: string
    attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {

    get questionId() {
        return this.props.attachmentId
    }

    get attachmentId() {
        return this.props.attachmentId
    }

    static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
        const questionAttachment = new QuestionAttachment(props, id)
        
        return questionAttachment
    }

}