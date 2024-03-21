export class DocumentEntity {
    public id: string;
    public title: string;
    public description: string;
    public url: string;

    constructor(
        id: string,
        title: string,
        description: string,
        url: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
    }
}
