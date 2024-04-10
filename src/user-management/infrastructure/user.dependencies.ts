import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "../application/use-cases/delete-user.use-case";
import { GetUserUseCase } from "../application/use-cases/get-user.use-case";
import { GetUsersUseCase } from "../application/use-cases/get-users.use-case";
import { UpdateUserUseCase } from "../application/use-cases/update-user.use-case";
import { GetUserByEmailUseCase } from "../application/use-cases/get-user-by-email.use-case";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { MysqlUserRepository } from "./repositories/mysql-user.repository";

const mysqlUserRepository = new MysqlUserRepository();

const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
const getUserUseCase = new GetUserUseCase(mysqlUserRepository);
const getUsersUseCase = new GetUsersUseCase(mysqlUserRepository);
const updateUserUseCase = new UpdateUserUseCase(mysqlUserRepository);
const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
const getUserByEmailUseCase = new GetUserByEmailUseCase(mysqlUserRepository);

export const userController = new UserController(createUserUseCase, getUserUseCase, getUsersUseCase, updateUserUseCase, deleteUserUseCase);
export const authController = new AuthController(getUserByEmailUseCase);

