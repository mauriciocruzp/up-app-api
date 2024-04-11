import signale from "signale";
import { FileRepository } from "../../infrastructure/repositories/file.repository";

export class UploadFileUseCase {
    constructor(readonly cloudinaryRepository: FileRepository) { }
    async execute(file: Express.Multer.File): Promise<string | null> {
        const result = await this.cloudinaryRepository.uploadFile(file);

        if (result === "error") {
            signale.error("Failed to upload file");
            return null;
        }
        return result;
    }
}
