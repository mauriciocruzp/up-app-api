import { EventEntity } from "../../domain/entities/event.entity";
import { EventInterface } from "../../domain/interfaces/event.interface";
import EventModel from "../../../mysql/models/event.model";
import signale from "signale";

export class MysqlEventRepository implements EventInterface {
    public async createEvent(event: EventEntity): Promise<EventEntity | null> {
        try {
            const createdEvent = await EventModel.create({
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                image: event.image,
            });
            return createdEvent;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    public async getEvent(id: string): Promise<EventEntity | null> {
        try {
            const event = await this.findEventById(id);
            if (!event) {
                return null;
            }
            return event;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    public async getEvents(): Promise<EventEntity[] | null> {
        const events = await EventModel.findAll();
        if (!events) {
            return null;
        }
        return events;
    }

    public async updateEvent(event: EventEntity): Promise<EventEntity | null> {
        const foundEvent = await this.findEventById(event.id);
        if (!foundEvent) {
            return null;
        }
        await EventModel.update(
            {
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                image: event.image,
            },
            { where: { id: event.id } }
        );
        return event;
    }

    public async deleteEvent(id: string): Promise<boolean> {
        const foundEvent = await this.findEventById(id);
        if (!foundEvent) {
            signale.error(`Document with id ${id} not found`);
            return Promise.resolve(false);
        }
        await EventModel.destroy({ where: { id } });
        return Promise.resolve(true);
    }

    async findEventById(id: string): Promise<EventEntity | null> {
        const event = await EventModel.findOne({ where: { id } });
        if (!event) {
            return null;
        }
        return event;
    }
}
