import express from "express";
import { modelController } from "../Controllers/ModelController.js";
import { verifyToken, checkRole } from '../Middlewares/authentication.js';

export const modelRoutes = express.Router();

modelRoutes.post('/create',verifyToken, checkRole(["admin"]), modelController.createModel);
modelRoutes.get('/allmodel', modelController.getModels);
modelRoutes.get('/:id', modelController.getModelById);
modelRoutes.put('/:id',verifyToken, checkRole(["admin"]), modelController.editModel);
modelRoutes.delete('/:id', verifyToken, checkRole(["admin"]), modelController.deleteModel);
modelRoutes.get('/getByBrand', modelController.getByBrand);

export default modelRoutes;