import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface DocumentAttributes {
    id: string;
    title: string;
    description: string;
    url: string;
}

@Table({
    tableName: 'documents',
    modelName: 'Document',
    timestamps: false,
})

export default class DocumentModel extends Model implements DocumentAttributes {
    @Column({
        primaryKey: true,
        type: DataType.STRING,
    })
    declare id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare title: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare description: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare url: string;
}
