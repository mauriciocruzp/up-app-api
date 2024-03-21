import { DocumentEntity } from "../../domain/entities/document.entity";
import { DocumentInterface } from "../../domain/interfaces/document.interface";
import signale from "signale";

export class UpdateDocumentUseCase {
    constructor(readonly documentRepository: DocumentInterface) { }

    async execute(id: string, title: string, description: string, url: string): Promise<DocumentEntity | null> {
        const document = new DocumentEntity(id, title, description, url);
        const updatedDocument = await this.documentRepository.updateDocument(document);

        if (!updatedDocument) {
            signale.error("Failed to update document");
            return null;
        }
        return updatedDocument;
    }
}
