import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";
import signale from "signale";

export class UpdateUserUseCase {
    constructor(readonly userRepository: UserInterface) { }

    async execute(id: string, firstName: string, lastName: string, email: string, password: string, admin: boolean): Promise<UserEntity | null> {
        const updatedUser = await this.userRepository.updateUser({ id, firstName, lastName, email, password, admin });

        if (!updatedUser) {
            signale.error("Failed to update user");
            return null;
        }
        return updatedUser;
    }
}
