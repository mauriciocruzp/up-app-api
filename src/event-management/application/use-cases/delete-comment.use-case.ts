import { CommentInterface } from "../../domain/interfaces/comment.interface";
import signale from "signale";

export class DeleteCommentUseCase {
    constructor(readonly commentRepository: CommentInterface) { }

    async execute(id: string): Promise<boolean> {
        const deleted = await this.commentRepository.deleteComment(id);

        if (!deleted) {
            signale.error("Failed to delete comment");
            return false;
        }

        return true;
    }
}
