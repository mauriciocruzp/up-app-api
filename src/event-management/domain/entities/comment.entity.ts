export class CommentEntity {
    public id: string;
    public eventId: string;
    public userId: string;
    public text: string;
    public imageUrl: string;

    constructor(
        id: string,
        eventId: string,
        userId: string,
        text: string,
        imageUrl: string
    ) {
        this.id = id;
        this.eventId = eventId;
        this.userId = userId;
        this.text = text;
        this.imageUrl = imageUrl;
    }
}
