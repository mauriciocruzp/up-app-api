import passport from "passport";
import * as jwt from "jsonwebtoken";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "../../application/use-cases/delete-user.use-case";
import { GetUserUseCase } from "../../application/use-cases/get-user.use-case";
import { GetUsersUseCase } from "../../application/use-cases/get-users.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/update-user.use-case";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export class UserController {
    constructor(readonly createUserUseCase: CreateUserUseCase, readonly getUserUseCase: GetUserUseCase, readonly getUsersUseCase: GetUsersUseCase, readonly updateUserUseCase: UpdateUserUseCase, readonly deleteUserUseCase: DeleteUserUseCase) { }

    async createUser(req: Request, res: Response) {
        const JWT_SECRET = process.env.JWT_SECRET || "secret";
        const { firstName, lastName, email, password } = req.body;
        const admin = false;
        const user = await this.createUserUseCase.execute(firstName, lastName, email, password, admin);

        if (!user) {
            return res.status(500).json({ message: "Failed to create user" });
        }
        console.log(req.body.scope)
        const token = jwt.sign({ email: email }, JWT_SECRET);
        return res.status(201).json({ message: "User created successfully!", token: token });
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.getUserUseCase.execute(id);

        if (!user) {
            return res.status(500).json({ message: "Failed to get user" });
        }
        return res.status(200).json({ message: "User retrieved successfully!", user });
    }

    async getUsers(req: Request, res: Response) {
        const users = await this.getUsersUseCase.execute();

        if (!users) {
            return res.status(500).json({ message: "Failed to get users" });
        }
        return res.status(200).json({ message: "Users retrieved successfully!", users });
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;
        const admin = false;
        const user = await this.updateUserUseCase.execute(id, firstName, lastName, email, password, admin);

        if (!user) {
            return res.status(500).json({ message: "Failed to update user" });
        }
        return res.status(200).json({ message: "User updated successfully!", user });
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.deleteUserUseCase.execute(id);

        if (!user) {
            return res.status(500).json({ message: "Failed to delete user" });
        }
        return res.status(200).json({ message: "User deleted successfully!" });
    }

    public authenticateUser(req: Request, res: Response, next: NextFunction) {
        const JWT_SECRET = process.env.JWT_SECRET || "secret";
        console.log(req.body)
        passport.authenticate("local", function (req: any, res: any) {
            const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
            res.status(200).send({ token: token });
        });
    }
}
