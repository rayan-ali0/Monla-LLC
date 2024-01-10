import express from "express";
import { userController } from "../Controllers/UserController.js";

export const userRoutes = express.Router();

userRoutes.post('/create', userController.createUser);
userRoutes.get('/all', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.put('/:id', userController.updateUserById);
userRoutes.delete('/:id', userController.deleteUserById);

export default userRoutes;
