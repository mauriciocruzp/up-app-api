import express from "express";
import { commentController } from "../comment.dependencies";

export const commentRouter = express.Router();

commentRouter.post('/', commentController.createComment.bind(commentController));
commentRouter.get('/:id', commentController.getComment.bind(commentController));
commentRouter.get('/', commentController.getComments.bind(commentController));
commentRouter.put('/:id', commentController.updateComment.bind(commentController));
commentRouter.delete('/:id', commentController.deleteComment.bind(commentController));
