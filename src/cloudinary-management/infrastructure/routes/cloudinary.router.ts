import express from "express";
import { cloudinaryController } from "../cloudinary.dependencies";

export const cloudinaryManagementRouter = express.Router();

cloudinaryManagementRouter.post('/upload', cloudinaryController.uploadFile.bind(cloudinaryController));
cloudinaryManagementRouter.delete('/delete/:id', cloudinaryController.deleteFile.bind(cloudinaryController));
