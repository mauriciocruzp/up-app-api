import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";
import signale from "signale";

export class GetUserUseCase {
    constructor(readonly userRepository: UserInterface) { }

    async execute(id: string): Promise<UserEntity | null> {
        const user = await this.userRepository.getUser(id);

        if (!user) {
            signale.error("Failed to get user");
            return null;
        }
        return user;
    }
}
