import { CommentEntity } from "../entities/comment.entity";

export interface CommentInterface {
    createComment(comment: CommentEntity): Promise<CommentEntity | null>;
    getComment(id: string): Promise<CommentEntity | null>;
    getCommentsByEventId(id: string): Promise<CommentEntity[] | null>;
    updateComment(comment: CommentEntity): Promise<CommentEntity | null>;
    deleteComment(id: string): Promise<boolean>;
}
