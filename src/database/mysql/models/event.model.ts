import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface EventAttributes {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    image: string;
}

@Table({
    tableName: 'events',
    modelName: 'Event',
    timestamps: false,
})

export default class EventModel extends Model implements EventAttributes {
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
        type: DataType.TEXT('long'),
    })
    declare description: string;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    declare date: Date;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare location: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare image: string;
}
