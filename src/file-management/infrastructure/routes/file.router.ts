import express from "express";
import { cloudinaryController } from "../file.dependencies";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', storage: storage });

export const cloudinaryManagementRouter = express.Router();

cloudinaryManagementRouter.post('/upload', upload.single('file'), cloudinaryController.uploadFile.bind(cloudinaryController));
