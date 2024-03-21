import { DocumentInterface } from "../../domain/interfaces/document.interface";
import signale from "signale";

export class DeleteDocumentUseCase {
    constructor(readonly documentRepository: DocumentInterface) { }

    async execute(id: string): Promise<boolean> {
        const deleted = await this.documentRepository.deleteDocument(id);

        if (!deleted) {
            signale.error("Failed to delete document");
            return false;
        }
        return true;
    }
}
