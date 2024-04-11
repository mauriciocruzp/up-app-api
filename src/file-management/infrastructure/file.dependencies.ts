import { UploadFileUseCase } from "../application/use-cases/upload-file.use-case";
import { FileController } from "./controllers/file.controller";
import { FileRepository } from "./repositories/file.repository";

const fileRepository = new FileRepository();

const uploadFileUseCase = new UploadFileUseCase(fileRepository);

export const cloudinaryController = new FileController(uploadFileUseCase);
