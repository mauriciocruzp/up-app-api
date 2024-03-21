import { EventEntity } from "../../domain/entities/event.entity";
import { EventInterface } from "../../domain/interfaces/event.interface";
import signale from "signale";

export class GetEventUseCase {
    constructor(readonly eventRepository: EventInterface) {}

    async execute(id: string): Promise<EventEntity | null> {
        const event = await this.eventRepository.getEvent(id);

        if (!event) {
            signale.error("Failed to get event");
            return null;
        }
        return event;
    }
}
