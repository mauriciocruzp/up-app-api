import { EventEntity } from "../entities/event.entity";

export interface EventInterface {
    createEvent(event: EventEntity): Promise<EventEntity | null>;
    getEvent(id: string): Promise<EventEntity | null>;
    getEvents(): Promise<EventEntity[] | null>;
    updateEvent(event: EventEntity): Promise<EventEntity | null>;
    deleteEvent(id: string): Promise<boolean>;
}
