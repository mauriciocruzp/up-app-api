import { UserInterface } from "../../domain/interfaces/user.interface";
import signale from "signale";

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserInterface) { }

    async execute(id: string): Promise<boolean> {
        const deleted = await this.userRepository.deleteUser(id);

        if (!deleted) {
            signale.error("Failed to delete user");
            return false;
        }
        return true;
    }
}
