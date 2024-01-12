import express from "express";
import { modelController } from "../Controllers/ModelController.js";

export const modelRoutes = express.Router();

modelRoutes.post('/create', modelController.createModel);
modelRoutes.get('/allmodel', modelController.getModels);
modelRoutes.get('/:id', modelController.getModelById);
modelRoutes.put('/:id', modelController.editModel);
modelRoutes.delete('/:id',  modelController.deleteModel);
modelRoutes.get('/getByBrand', modelController.getByBrand);

export default modelRoutes;