import express from 'express';
import { eventController } from '../event.dependencies';

export const eventManagementRouter = express.Router();

eventManagementRouter.post('/', eventController.createEvent.bind(eventController));
eventManagementRouter.get('/:id', eventController.getEvent.bind(eventController));
eventManagementRouter.get('/', eventController.getEvents.bind(eventController));
eventManagementRouter.put('/:id', eventController.updateEvent.bind(eventController));
eventManagementRouter.delete('/:id', eventController.deleteEvent.bind(eventController));
