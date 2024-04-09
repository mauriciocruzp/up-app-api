import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";
import signale from "signale";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
    constructor(readonly userRepository: UserInterface) { }

    async execute(firstName: string, lastName: string, email: string, password: string, admin: boolean): Promise<UserEntity | null> {
        const id = uuidv4();
        const user = new UserEntity(id, firstName, lastName, email, password, admin);
        const createdUser = await this.userRepository.createUser(user);

        if (!createdUser) {
            signale.error("Failed to create user");
            return null;
        }
        return createdUser;
    }
}
