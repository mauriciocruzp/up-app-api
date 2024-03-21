import express from "express";
import dotenv from 'dotenv';
import { Signale } from 'signale';
import morgan from 'morgan';
import { eventManagementRouter } from "./event-management/infrastructure/routes/event.router";
import { documentManagementRouter } from "./document-management/infrastructure/routes/document.router";
import syncConnection from "./mysql/connection";
import { } from '../tsconfig.json';

export const app = express();
const logger = new Signale();

dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

app.use(`${API_PREFIX}/events`, eventManagementRouter);
app.use(`${API_PREFIX}/documents`, documentManagementRouter);

async function startServer() {
    await syncConnection();
    app.listen(PORT, () => {
        logger.success(`Server running on http://localhost:${PORT}${API_PREFIX}`);
    });
}

startServer();
