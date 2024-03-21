import { DocumentEntity } from "../../domain/entities/document.entity";
import { DocumentInterface } from "../../domain/interfaces/document.interface";
import signale from "signale";

export class GetDocumentUseCase {
    constructor(readonly documentRepository: DocumentInterface) { }

    async execute(id: string): Promise<DocumentEntity | null> {
        const document = await this.documentRepository.getDocument(id);

        if (!document) {
            signale.error("Failed to get document");
            return null;
        }
        return document;
    }
}
