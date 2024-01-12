import express from "express";
import { yearController } from "../Controllers/YearController.js";
import { verifyToken, checkRole } from '../Middlewares/authentication.js';

export const yearRoutes = express.Router();

yearRoutes.post('/create',verifyToken, checkRole(["admin"]),yearController.createYear);
yearRoutes.get('/allyear', yearController.getYears);
yearRoutes.get('/:id', yearController.getYearById);
yearRoutes.put('/:id',verifyToken, checkRole(["admin"]), yearController.editYear);
yearRoutes.delete('/:id', verifyToken, checkRole(["admin"]), yearController.deleteYear);
yearRoutes.get('/getByModel', yearController.getByModel);

export default yearRoutes;