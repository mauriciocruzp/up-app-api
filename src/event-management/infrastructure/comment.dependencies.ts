import { CreateCommentUseCase } from "../application/use-cases/create-comment.use-case";
import { DeleteCommentUseCase } from "../application/use-cases/delete-comment.use-case";
import { GetCommentUseCase } from "../application/use-cases/get-comment.use-case";
import { GetCommentsUseCase } from "../application/use-cases/get-comments.use-case";
import { UpdateCommentUseCase } from "../application/use-cases/update-comment.use-case";
import { CommentController } from "./controllers/comment.controller";
import { MysqlCommentRepository } from "./repositories/mysql-comment.repository";

const mysqlCommentRepository = new MysqlCommentRepository();

const createCommentUseCase = new CreateCommentUseCase(mysqlCommentRepository);
const getCommentUseCase = new GetCommentUseCase(mysqlCommentRepository);
const getCommentsUseCase = new GetCommentsUseCase(mysqlCommentRepository);
const updateCommentUseCase = new UpdateCommentUseCase(mysqlCommentRepository);
const deleteCommentUseCase = new DeleteCommentUseCase(mysqlCommentRepository);

export const commentController = new CommentController(createCommentUseCase, getCommentUseCase, getCommentsUseCase, updateCommentUseCase, deleteCommentUseCase);
