import express from "express";
import { userController } from "../Controllers/UserController.js";
import { verifyToken } from '../Middlewares/authentication.js';

export const userRoutes = express.Router();

userRoutes.post('/register', userController.register);
userRoutes.get('/all', verifyToken, userController.getAllUsers);
userRoutes.get('/:id', verifyToken, userController.getUserById);
userRoutes.put('/:id', verifyToken, userController.updateUserById);
userRoutes.delete('/:id', verifyToken, userController.deleteUserById);

export default userRoutes;
