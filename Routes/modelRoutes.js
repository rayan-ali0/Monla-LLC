import express from "express";
import { modelController } from "../Controllers/ModelController.js";
import { verifyToken, checkRole } from '../Middlewares/authentication.js';

export const modelRoutes = express.Router();

modelRoutes.post('/create', modelController.createModel);
modelRoutes.get('/allmodel', modelController.getModels);
modelRoutes.get('/:id', modelController.getModelById);
modelRoutes.put('/:id', modelController.editModel);
modelRoutes.delete('/:id',  modelController.deleteModel);
modelRoutes.get('/byBrand/:brandId', modelController.getByBrand);

export default modelRoutes;