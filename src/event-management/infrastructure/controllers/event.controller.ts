import { CreateEventUseCase } from "../../application/use-cases/create-event.use-case";
import { DeleteEventUseCase } from "../../application/use-cases/delete-event.use-case";
import { GetEventUseCase } from "../../application/use-cases/get-event.use-case";
import { GetEventsUseCase } from "../../application/use-cases/get-events.use-case";
import { UpdateEventUseCase } from "../../application/use-cases/update-event.use-case";
import { Request, Response } from "express";


export class EventController {
    constructor(readonly createEventUseCase: CreateEventUseCase, readonly getEventUseCase: GetEventUseCase, readonly getEventsUseCase: GetEventsUseCase, readonly updateEventUseCase: UpdateEventUseCase, readonly deleteEventUseCase: DeleteEventUseCase) { }

    async createEvent(req: Request, res: Response) {
        const { title, description, date, location, image } = req.body;
        const event = await this.createEventUseCase.execute(title, description, date, location, image);

        if (!event) {
            return res.status(500).json({ message: "Failed to create event" });
        }
        return res.status(201).json({ message: "Event created successfully!", event });
    }

    async getEvent(req: Request, res: Response) {
        const { id } = req.params;
        const event = await this.getEventUseCase.execute(id);

        if (!event) {
            return res.status(500).json({ message: "Failed to get event" });
        }
        return res.status(200).json({ message: "Event retrieved successfully!", event });
    }

    async getEvents(req: Request, res: Response) {
        const events = await this.getEventsUseCase.execute();

        if (!events) {
            return res.status(500).json({ message: "Failed to get events" });
        }
        return res.status(200).json({ message: "Events retrieved successfully!", events });
    }

    async updateEvent(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, date, location, image } = req.body;
        const event = await this.updateEventUseCase.execute(id, title, description, date, location, image);

        if (!event) {
            return res.status(500).json({ message: "Failed to update event" });
        }
        return res.status(200).json({ message: "Event updated successfully!", event });
    }

    async deleteEvent(req: Request, res: Response) {
        const { id } = req.params;
        const event = await this.deleteEventUseCase.execute(id);

        if (!event) {
            return res.status(500).json({ message: "Failed to delete event" });
        }
        return res.status(200).json({ message: "Event deleted successfully!" });
    }
}
