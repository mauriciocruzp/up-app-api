import signale from "signale";
import { CloudinaryRepository } from "../../infrastructure/repositories/cloudinary.repository";

export class DeleteFileUseCase {
    constructor(readonly cloudinaryRepository: CloudinaryRepository) { }

    async execute(publicId: string): Promise<boolean> {
        const result = await this.cloudinaryRepository.deleteFile(publicId);

        if (!result) {
            signale.error("Failed to delete file");
            return false;
        }

        return result;
    }
}
