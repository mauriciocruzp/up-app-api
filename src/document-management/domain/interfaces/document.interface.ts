import { DocumentEntity } from "../entities/document.entity";

export interface DocumentInterface {
    createDocument(document: DocumentEntity): Promise<DocumentEntity | null>;
    getDocument(id: string): Promise<DocumentEntity | null>;
    getDocuments(): Promise<DocumentEntity[] | null>;
    updateDocument(document: DocumentEntity): Promise<DocumentEntity | null>;
    deleteDocument(id: string): Promise<boolean>;
}
