import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    admin: boolean;
}

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
})

export default class UserModel extends Model implements UserAttributes {
    @Column({
        primaryKey: true,
        type: DataType.STRING,
        unique: true,
    })
    declare id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare firstName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare lastName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    declare email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
    })
    declare admin: boolean;
}
