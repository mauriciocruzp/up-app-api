import { CommentEntity } from "../../domain/entities/comment.entity";
import { CommentInterface } from "../../domain/interfaces/comment.interface";
import signale from "signale";
import { v4 as uuidv4 } from "uuid";


export class CreateCommentUseCase {
    constructor(readonly commentRepository: CommentInterface) {}

    async execute(eventId: string, userId: string, text: string, imageUrl: string): Promise<CommentEntity | null> {
        const id = uuidv4();
        const comment = new CommentEntity( id, eventId, userId, text, imageUrl );
        const createdComment = await this.commentRepository.createComment(comment);

        if (!createdComment) {
            signale.error("Failed to create comment");
            return null;
        }
        return createdComment;
    }
}
