import { UserInterface } from "../../domain/interfaces/user.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import UserModel from "../../../database/mysql/models/user.model";
import signale from "signale";
import { BcryptUtils } from "../utils/bcrypt.utils";

export class MysqlUserRepository implements UserInterface {
    public async createUser(user: UserEntity): Promise<UserEntity | null> {
        const foundUser = await UserModel.findOne({ where: { email: user.email } });

        const encryptedPassword = await BcryptUtils.hash(user.password);

        if (foundUser === null) {
            const createdUser = await UserModel.create({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: encryptedPassword,
                admin: user.admin
            });
            createdUser.password = "";
            return createdUser;
        }
        return null;
    }

    public async getUser(id: string): Promise<UserEntity | null> {
        try {
            const user = this.findUserById(id);
            if (!user) {
                return null;
            }
            return user;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }
    public async getUsers(): Promise<UserEntity[]> {
        try {
            const users = await UserModel.findAll();
            if (!users) {
                return [];
            }
            return users;
        } catch (error) {
            signale.error(error);
            return [];
        }
    }
    public async updateUser(user: UserEntity): Promise<UserEntity | null> {
        try {
            const foundUser = await this.findUserById(user.id);
            if (!foundUser) {
                return null;
            }
            await UserModel.update(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    admin: user.admin
                },
                { where: { id: user.id } }
            );
            return user;
        } catch (error) {
            signale.error(error);
            return null;
        }
    }
    public async deleteUser(id: string): Promise<boolean> {
        try {
            const foundUser = this.findUserById(id);
            if (!foundUser) {
                signale.error(`Document with id ${id} not found`);
                return false;
            }
            await UserModel.destroy({ where: { id } });
            return Promise.resolve(true);
        } catch (error) {
            signale.error(error);
            return Promise.resolve(false);
        }
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ where: { id } });
        if (!user) {
            return null;
        }
        return user;
    }
}
