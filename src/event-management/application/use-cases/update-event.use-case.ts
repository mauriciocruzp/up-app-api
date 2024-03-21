import { EventEntity } from "../../domain/entities/event.entity";
import { EventInterface } from "../../domain/interfaces/event.interface";
import signale from "signale";

export class UpdateEventUseCase {
    constructor(readonly eventRepository: EventInterface) {}

    async execute(id:string, title: string, description: string, date: Date, location: string, image: string): Promise<EventEntity | null> {
        const updatedEvent = await this.eventRepository.updateEvent({id, title, description, date, location, image});

        if (!updatedEvent) {
            signale.error("Failed to update event");
            return null;
        }
        return updatedEvent;
    }
}
