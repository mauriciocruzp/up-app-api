import express from "express";
import { documentController } from "../document.dependencies";

export const documentManagementRouter = express.Router();

documentManagementRouter.post('/', documentController.createDocument.bind(documentController));
documentManagementRouter.get('/:id', documentController.getDocument.bind(documentController));
documentManagementRouter.get('/', documentController.getDocuments.bind(documentController));
documentManagementRouter.put('/:id', documentController.updateDocument.bind(documentController));
documentManagementRouter.delete('/:id', documentController.deleteDocument.bind(documentController));
