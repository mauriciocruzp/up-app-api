export class EventEntity {
    public id: string;
    public title: string;
    public description: string;
    public date: Date;
    public location: string;
    public image: string;

    constructor(
        id: string,
        title: string,
        description: string,
        date: Date,
        location: string,
        image: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.image = image;
    }
}
