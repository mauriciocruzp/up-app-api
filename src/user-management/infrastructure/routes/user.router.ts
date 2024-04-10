import express from "express";
import { userController } from "../user.dependencies";

export const userManagementRouter = express.Router();

userManagementRouter.post('/', userController.createUser.bind(userController));
userManagementRouter.get('/:id', userController.getUser.bind(userController));
userManagementRouter.get('/', userController.getUsers.bind(userController));
userManagementRouter.put('/:id', userController.updateUser.bind(userController));
userManagementRouter.delete('/:id', userController.deleteUser.bind(userController));
userManagementRouter.post('/register', userController.createUser.bind(userController));
userManagementRouter.post('/login', userController.authenticateUser.bind(userController));
