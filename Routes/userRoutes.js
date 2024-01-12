import express from "express";
import { userController } from "../Controllers/UserController.js";
import { verifyToken, checkRole } from '../Middlewares/authentication.js';

export const userRoutes = express.Router();

userRoutes.post('/register', userController.register);
userRoutes.get('/all', verifyToken, checkRole(["admin"]), userController.getAllUsers);
userRoutes.get('/:id', verifyToken, checkRole(["admin"]), userController.getUserById);
userRoutes.put('/:id', verifyToken, checkRole(["admin"]), userController.updateUserById);
userRoutes.delete('/:id', verifyToken, checkRole(["admin"]), userController.deleteUserById);

userRoutes.get('/read/one', verifyToken, checkRole(["admin"]), userController.getOneUser);

export default userRoutes;