import { Table, Model, Column, DataType } from "sequelize-typescript";

export interface CommentAttributes {
    id: string;
    eventId: string;
    userId: string;
    text: string;
    imageUrl: string;
}

@Table({
    tableName: 'comments',
    modelName: 'Comment',
    timestamps: false,
})

export default class CommentModel extends Model implements CommentAttributes {
    @Column({
        primaryKey: true,
        type: DataType.STRING,
    })
    declare id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare eventId: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare userId: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare text: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    declare imageUrl: string;
}
