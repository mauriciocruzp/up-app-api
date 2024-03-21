import { DocumentEntity } from "../../domain/entities/document.entity";
import { DocumentInterface } from "../../domain/interfaces/document.interface";
import { v4 as uuidv4 } from "uuid";
import signale from "signale";

export class CreateDocumetUseCase {
    constructor(readonly documentRepository: DocumentInterface) { }

    async execute(title: string, description: string, url: string): Promise<DocumentEntity | null> {
        const id = uuidv4();
        const document = new DocumentEntity(id, title, description, url);
        const createdDocument = await this.documentRepository.createDocument(document);

        if (!createdDocument) {
            signale.error("Failed to create document");
            return null;
        }
        return createdDocument;
    }
}
