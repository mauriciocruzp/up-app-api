import { CommentEntity } from "../../domain/entities/comment.entity";
import { CommentInterface } from "../../domain/interfaces/comment.interface";
import signale from "signale";

export class GetCommentUseCase {
    constructor(readonly commentRepository: CommentInterface) {}

    async execute(id: string): Promise<CommentEntity | null> {
        const comment = await this.commentRepository.getComment(id);

        if (!comment) {
            signale.error("Failed to get comment");
            return null;
        }
        return comment;
    }
}
