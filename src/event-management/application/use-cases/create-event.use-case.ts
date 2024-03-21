import { EventEntity } from "../../domain/entities/event.entity";
import { EventInterface } from "../../domain/interfaces/event.interface";
import signale from "signale";
import { v4 as uuidv4 } from "uuid";


export class CreateEventUseCase {
    constructor(readonly eventRepository: EventInterface) { }

    async execute(title: string, description: string, date: Date, location: string, image: string): Promise<EventEntity | null> {
        const id = uuidv4();
        const event = new EventEntity(id, title, description, date, location, image);
        const createdEvent = await this.eventRepository.createEvent(event);

        if (!createdEvent) {
            signale.error("Failed to create event");
            return null;
        }
        return createdEvent;
    }
}
