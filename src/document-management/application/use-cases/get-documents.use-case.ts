import { DocumentEntity } from "../../domain/entities/document.entity";
import { DocumentInterface } from "../../domain/interfaces/document.interface";
import signale from "signale";

export class GetDocumentsUseCase {
    constructor(readonly documentRepository: DocumentInterface) { }

    async execute(): Promise<DocumentEntity[] | null> {
        const documents = await this.documentRepository.getDocuments();

        if (!documents) {
            signale.error("Failed to get documents");
            return null;
        }
        return documents;
    }
}
