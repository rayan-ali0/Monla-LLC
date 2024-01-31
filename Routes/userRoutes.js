import express from "express";
import { userController } from "../Controllers/UserController.js";
import { verifyToken, checkRole } from '../Middlewares/authentication.js';

export const userRoutes = express.Router();

userRoutes.post('/register', userController.register);
userRoutes.get('/all', userController.getAllUsers);
userRoutes.get('/:id', verifyToken, checkRole(["admin"]), userController.getUserById);
userRoutes.put('/:id', userController.updateUserById);
userRoutes.delete('/:id', userController.deleteUserById);

userRoutes.get('/read/one', verifyToken, userController.getOneUser);

export default userRoutes;