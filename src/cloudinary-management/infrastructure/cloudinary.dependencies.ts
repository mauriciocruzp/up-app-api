import { DeleteFileUseCase } from "../application/use-cases/delete-file.use-case";
import { UploadFileUseCase } from "../application/use-cases/upload-file.use-case";
import { CloudinaryController } from "./controllers/cloudinary.controller";
import { CloudinaryRepository } from "./repositories/cloudinary.repository";

const cloudinaryRepository = new CloudinaryRepository();

const uploadFileUseCase = new UploadFileUseCase(cloudinaryRepository);
const deleteFileUseCase = new DeleteFileUseCase(cloudinaryRepository);

export const cloudinaryController = new CloudinaryController(uploadFileUseCase, deleteFileUseCase);
