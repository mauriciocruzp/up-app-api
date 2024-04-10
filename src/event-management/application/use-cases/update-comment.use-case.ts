import { CommentEntity } from "../../domain/entities/comment.entity";
import { CommentInterface } from "../../domain/interfaces/comment.interface";
import signale from "signale";

export class UpdateCommentUseCase {
    constructor(readonly commentRepository: CommentInterface) {}

    async execute(id: string, eventId: string, userId: string, text: string, imageUrl: string ): Promise<CommentEntity | null> {
        const updated = await this.commentRepository.updateComment({ id, eventId, userId, text, imageUrl});

        if (!updated) {
            signale.error("Failed to update comment");
            return null;
        }
        return updated;
    }
}
