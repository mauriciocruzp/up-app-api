import { CreateDocumetUseCase } from "../application/use-cases/create-document.use-case";
import { DeleteDocumentUseCase } from "../application/use-cases/delete-document.use-case";
import { GetDocumentUseCase } from "../application/use-cases/get-document.use-case";
import { GetDocumentsUseCase } from "../application/use-cases/get-documents.use-case";
import { UpdateDocumentUseCase } from "../application/use-cases/update-document.use-case";
import { DocumentController } from "./controllers/document.controller";
import { MysqlDocumentRepository } from "./repositories/mysql-document.repository";

const mySqlDocumentRepository = new MysqlDocumentRepository();

const createDocumentUseCase = new CreateDocumetUseCase(mySqlDocumentRepository);
const getDocumentUseCase = new GetDocumentUseCase(mySqlDocumentRepository);
const getDocumentsUseCase = new GetDocumentsUseCase(mySqlDocumentRepository);
const updateDocumentUseCase = new UpdateDocumentUseCase(mySqlDocumentRepository);
const deleteDocumentUseCase = new DeleteDocumentUseCase(mySqlDocumentRepository);

export const documentController = new DocumentController(createDocumentUseCase, getDocumentUseCase, getDocumentsUseCase, updateDocumentUseCase, deleteDocumentUseCase);
