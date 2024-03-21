import { CreateEventUseCase } from "../application/use-cases/create-event.use-case";
import { DeleteEventUseCase } from "../application/use-cases/delete-event.use-case";
import { GetEventUseCase } from "../application/use-cases/get-event.use-case";
import { GetEventsUseCase } from "../application/use-cases/get-events.use-case";
import { UpdateEventUseCase } from "../application/use-cases/update-event.use-case";
import { EventController } from "./controllers/event.controller";
import { MysqlEventRepository } from "./repositories/mysql-event.repository";

const mysqlEventRepository = new MysqlEventRepository();

const createEventUseCase = new CreateEventUseCase(mysqlEventRepository);
const getEventUseCase = new GetEventUseCase(mysqlEventRepository);
const getEventsUseCase = new GetEventsUseCase(mysqlEventRepository);
const updateEventUseCase = new UpdateEventUseCase(mysqlEventRepository);
const deleteEventUseCase = new DeleteEventUseCase(mysqlEventRepository);

export const eventController = new EventController(createEventUseCase, getEventUseCase, getEventsUseCase, updateEventUseCase, deleteEventUseCase);
