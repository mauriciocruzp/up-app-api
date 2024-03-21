import { DocumentEntity } from "../../domain/entities/document.entity";
import { DocumentInterface } from "../../domain/interfaces/document.interface";
import DocumentModel from "../../../mysql/models/document.model";
import signale from "signale";

export class MysqlDocumentRepository implements DocumentInterface {
    public async createDocument(document: DocumentEntity): Promise<DocumentEntity | null> {
        try {
            const createdDocument = await DocumentModel.create({
                id: document.id,
                title: document.title,
                description: document.description,
                url: document.url,
            });
            return createdDocument;
        } catch (error) {
            signale.error(error);
            return null;
        }

    }
    public async getDocument(id: string): Promise<DocumentEntity | null> {
        try {
            const document = await this.findDocumentById(id);
            if (!document) {
                return null;
            }
            return document;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }
    public async getDocuments(): Promise<DocumentEntity[] | null> {
        try {
            const documents = await DocumentModel.findAll();
            if (!documents) {
                return null;
            }
            return documents;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }
    public async updateDocument(document: DocumentEntity): Promise<DocumentEntity | null> {
        const foundDocument = await this.findDocumentById(document.id);
        if (!foundDocument) {
            return null;
        }
        await DocumentModel.update(
            {
                title: document.title,
                description: document.description,
                url: document.url,
            },
            { where: { id: document.id } }
        );
        return document;
    }
    public async deleteDocument(id: string): Promise<boolean> {
        const foundDocument = await this.findDocumentById(id);
        if (!foundDocument) {
            signale.error(`Document with id ${id} not found`);
            return Promise.resolve(false);
        }
        await DocumentModel.destroy({ where: { id } });
        return Promise.resolve(true);
    }

    async findDocumentById(id: string): Promise<DocumentEntity | null> {
        const document = await DocumentModel.findOne({ where: { id } });
        if (!document) {
            return null;
        }
        return document;
    }
}
