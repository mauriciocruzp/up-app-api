import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";
import signale from "signale";

export class GetUsersUseCase {
    constructor(readonly userRepository: UserInterface) { }

    async execute(): Promise<UserEntity[] | null> {
        const users = await this.userRepository.getUsers();

        if (!users) {
            signale.error("Failed to get user");
            return null;
        }
        return users;
    }
}
