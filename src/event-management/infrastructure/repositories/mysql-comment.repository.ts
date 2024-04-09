import signale from "signale";
import { CommentEntity } from "../../domain/entities/comment.entity";
import { CommentInterface } from "../../domain/interfaces/comment.interface";
import CommentModel from "../../../database/mysql/models/comment.model";

export class MysqlCommentRepository implements CommentInterface {
    public async createComment(comment: CommentEntity): Promise<CommentEntity | null> {
        try {
            const createdComment = await CommentModel.create({
                id: comment.id,
                eventId: comment.eventId,
                userId: comment.userId,
                text: comment.text,
                imageUrl: comment.imageUrl,
            });
            return createdComment;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    public async getComment(id: string): Promise<CommentEntity | null> {
        try {
            const comment = await this.findCommentById(id);
            if (!comment) {
                signale.error(`Document with id ${id} not found`);
                return null;
            }
            return comment;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    public async getCommentsByEventId(id: string): Promise<CommentEntity[] | null> {
        try {
            const comments = await CommentModel.findAll({ where: { eventId: id } });
            if (!comments) {
                return null;
            }
            return comments;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    public async updateComment(comment: CommentEntity): Promise<CommentEntity | null> {
        try {
            const foundComment = await this.findCommentById(comment.id);
            if (!foundComment) {
                return null;
            }
            await CommentModel.update(
                {
                    text: comment.text,
                    imageUrl: comment.imageUrl,
                },
                { where: { id: comment.id } }
            );
            return comment;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }

    public async deleteComment(id: string): Promise<boolean> {
        try {
            const foundComment = await this.findCommentById(id);
            if (!foundComment) {
                signale.error(`Document with id ${id} not found`);
                return Promise.resolve(false);
            }
            await CommentModel.destroy({ where: { id } });
            return Promise.resolve(true);
        } catch (error) {
            signale.error(error);
            return Promise.resolve(false);
        }
    }

    private async findCommentById(id: string): Promise<CommentEntity | null> {
        const comment = await CommentModel.findOne({ where: { id } });
        if (!comment) {
            return null;
        }
        return comment;
    }
}
