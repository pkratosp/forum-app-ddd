import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreateEvent } from "@/domain/forum/enterprise/events/answer-create-event";

export class OnAnswerCreated implements EventHandler {
    constructor() {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.execute.bind(this),
            AnswerCreateEvent.name
        )
    }

    private async execute({ answer }: AnswerCreateEvent) {
        console.log(answer)
    }
}