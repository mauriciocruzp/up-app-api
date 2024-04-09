import signale from "signale";
import { CommentEntity } from "../../domain/entities/comment.entity";
import { CommentInterface } from "../../domain/interfaces/comment.interface";

export class GetCommentsUseCase {
    constructor(readonly commentRepository: CommentInterface) {}

    async execute(id: string): Promise<CommentEntity[] | null> {
        const comments = await this.commentRepository.getCommentsByEventId(id);

        if (!comments) {
            signale.error("Failed to get comment");
            return null;
        }
        return comments;
    }
}
