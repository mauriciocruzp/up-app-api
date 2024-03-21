import { CreateDocumetUseCase } from "../../application/use-cases/create-document.use-case";
import { DeleteDocumentUseCase } from "../../application/use-cases/delete-document.use-case";
import { GetDocumentUseCase } from "../../application/use-cases/get-document.use-case";
import { GetDocumentsUseCase } from "../../application/use-cases/get-documents.use-case";
import { UpdateDocumentUseCase } from "../../application/use-cases/update-document.use-case";
import { Request, Response } from "express";

export class DocumentController {
    constructor(readonly createDocumentUseCase: CreateDocumetUseCase, readonly getDocumentUseCase: GetDocumentUseCase, readonly getDocumentsUseCase: GetDocumentsUseCase, readonly updateDocumentUseCase: UpdateDocumentUseCase, readonly deleteDocumentUseCase: DeleteDocumentUseCase) { }

    async createDocument(req: Request, res: Response) {
        const { title, description, url } = req.body;
        const document = await this.createDocumentUseCase.execute(title, description, url);

        if (!document) {
            return res.status(400).json({ message: "Failed to create document" });
        }
        return res.status(201).json({ message: "Document created successfully!", document });
    }

    async getDocument(req: Request, res: Response) {
        const { id } = req.params;
        const document = await this.getDocumentUseCase.execute(id);

        if (!document) {
            return res.status(400).json({ message: "Failed to get document" });
        }
        return res.status(200).json({ message: "Document retrieved successfully!", document });
    }

    async getDocuments(req: Request, res: Response) {
        const documents = await this.getDocumentsUseCase.execute();

        if (!documents) {
            return res.status(400).json({ message: "Failed to get documents" });
        }
        return res.status(200).json({ message: "Documents retrieved successfully!", documents });
    }

    async updateDocument(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, url } = req.body;
        const document = await this.updateDocumentUseCase.execute(id, title, description, url);

        if (!document) {
            return res.status(400).json({ message: "Failed to update document" });
        }
        return res.status(200).json({ message: "Document updated successfully!", document });
    }

    async deleteDocument(req: Request, res: Response) {
        const { id } = req.params;
        const document = await this.deleteDocumentUseCase.execute(id);

        if (!document) {
            return res.status(400).json({ message: "Failed to delete document" });
        }
        return res.status(200).json({ message: "Document deleted successfully!" });
    }
}
