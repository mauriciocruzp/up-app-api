import signale from "signale";
import { CloudinaryFile } from "../../domain/interfaces/cloudinary-file.interface";
import { CloudinaryRepository } from "../../infrastructure/repositories/cloudinary.repository";

export class UploadFileUseCase {
    constructor(readonly cloudinaryRepository: CloudinaryRepository) { }
    async execute(file: CloudinaryFile): Promise<string | null> {
        const result = await this.cloudinaryRepository.uploadFile(file);

        if (result === "error") {
            signale.error("Failed to upload file");
            return null;
        }
        return result;
    }
}
