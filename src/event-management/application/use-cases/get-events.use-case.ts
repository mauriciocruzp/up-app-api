import { EventEntity } from "../../domain/entities/event.entity";
import { EventInterface } from "../../domain/interfaces/event.interface";
import signale from "signale";

export class GetEventsUseCase {
    constructor(readonly eventRepository: EventInterface) {}

    async execute(): Promise<EventEntity[] | null> {
        const events = await this.eventRepository.getEvents();

        if (!events) {
            signale.error("Failed to get event");
            return null;
        }
        return events;
    }
}
