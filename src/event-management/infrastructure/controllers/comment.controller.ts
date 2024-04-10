import { CreateCommentUseCase } from "../../application/use-cases/create-comment.use-case";
import { DeleteCommentUseCase } from "../../application/use-cases/delete-comment.use-case";
import { GetCommentUseCase } from "../../application/use-cases/get-comment.use-case";
import { GetCommentsUseCase } from "../../application/use-cases/get-comments.use-case";
import { UpdateCommentUseCase } from "../../application/use-cases/update-comment.use-case";
import { Request, Response } from "express";


export class CommentController {
    constructor(readonly createCommentUseCase: CreateCommentUseCase, readonly getCommentUseCase: GetCommentUseCase, readonly getCommentsUseCase: GetCommentsUseCase, readonly updateCommentUseCase: UpdateCommentUseCase, readonly deleteCommentUseCase: DeleteCommentUseCase) { }

    async createComment(req: Request, res: Response) {
        const { eventId, userId, text, imageUrl } = req.body;
        const comment = await this.createCommentUseCase.execute(eventId, userId, text, imageUrl);

        if (!comment) {
            return res.status(500).json({ message: "Failed to create comment" });
        }
        return res.status(201).json({ message: "Comment created successfully!", comment });
    }

    async getComment(req: Request, res: Response) {
        const { id } = req.params;
        const comment = await this.getCommentUseCase.execute(id);

        if (!comment) {
            return res.status(500).json({ message: "Failed to get comment" });
        }
        return res.status(200).json({ message: "Comment retrieved successfully!", comment });
    }

    async getComments(req: Request, res: Response) {
        const eventId = req.query.eventId as string;
        const comments = await this.getCommentsUseCase.execute(eventId);

        if (!comments) {
            return res.status(500).json({ message: "Failed to get comments" });
        }
        return res.status(200).json({ message: "Comments retrieved successfully!", comments });
    }

    async updateComment(req: Request, res: Response) {
        const { id } = req.params;
        const { eventId, userId, text, imageUrl } = req.body;
        const comment = await this.updateCommentUseCase.execute(id, eventId, userId, text, imageUrl);

        if (!comment) {
            return res.status(500).json({ message: "Failed to update comment" });
        }
        return res.status(200).json({ message: "Comment updated successfully!", comment });
    }

    async deleteComment(req: Request, res: Response) {
        const { id } = req.params;
        const comment = await this.deleteCommentUseCase.execute(id);

        if (!comment) {
            return res.status(500).json({ message: "Failed to delete comment" });
        }
        return res.status(200).json({ message: "Comment deleted successfully!" });
    }
}
