import express from 'express';
import { companyController } from '../Controllers/CompanyController.js';
import { verifyToken } from "../Middlewares/authentication.js";
import { checkRole } from "../Middlewares/authentication.js";

const companyRoutes = express.Router();

companyRoutes.post('/create', verifyToken, checkRole(["admin"]), companyController.createCompany);
companyRoutes.get('/', verifyToken, checkRole(["admin"]), companyController.getCompany);
companyRoutes.put('/edit', verifyToken, checkRole(["admin"]), companyController.editCompany);
companyRoutes.delete('/delete', verifyToken, checkRole(["admin"]), companyController.deleteCompany);

export default companyRoutes;
