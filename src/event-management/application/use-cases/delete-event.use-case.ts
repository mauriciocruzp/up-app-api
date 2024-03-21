import { EventInterface } from "../../domain/interfaces/event.interface";
import signale from "signale";

export class DeleteEventUseCase {
    constructor(readonly eventRepository: EventInterface) {}

    async execute(id: string): Promise<boolean> {
        const deleted = await this.eventRepository.deleteEvent(id);

        if (!deleted) {
            signale.error("Failed to delete event");
            return false;
        }
        return true;
    }
}
