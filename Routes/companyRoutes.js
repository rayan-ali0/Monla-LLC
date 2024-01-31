import express from 'express';
import { companyController } from '../Controllers/CompanyController.js';
import { verifyToken } from "../Middlewares/authentication.js";
import { checkRole } from "../Middlewares/authentication.js";

const companyRoutes = express.Router();

companyRoutes.post('/create',  companyController.createCompany);
companyRoutes.get('/', companyController.getCompany);
companyRoutes.put('/:id', companyController.editCompany);
companyRoutes.delete('/:id', companyController.deleteCompany);

export default companyRoutes;
