import express from "express";
import { yearController } from "../Controllers/YearController.js";
export const yearRoutes = express.Router();

yearRoutes.post('/create',yearController.createYear);
yearRoutes.get('/allyear', yearController.getYears);
yearRoutes.get('/:id', yearController.getYearById);
yearRoutes.put('/:id', yearController.editYear);
yearRoutes.delete('/:id',  yearController.deleteYear);
yearRoutes.get('/getByModel', yearController.getByModel);

export default yearRoutes;