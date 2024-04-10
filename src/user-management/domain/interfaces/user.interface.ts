import { UserEntity } from "../entities/user.entity";

export interface UserInterface {
    createUser(user: UserEntity): Promise<UserEntity | null>;
    getUser(id: string): Promise<UserEntity | null>;
    getUsers(): Promise<UserEntity[]>;
    updateUser(user: UserEntity): Promise<UserEntity | null>;
    deleteUser(id: string): Promise<boolean>;
}
