import signale from "signale";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";

export class GetUserByEmailUseCase {
    constructor(readonly userRepository: UserInterface) { }

    async execute(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            signale.error("Failed to get user by email");
            return null;
        }
        return user;
    }
}
