import express from 'express';
import { companyController } from '../Controllers/CompanyController.js';

const companyRoutes = express.Router();

companyRoutes.get('/', companyController.getCompany);

companyRoutes.post('/create', companyController.createCompany);

companyRoutes.put('/edit', companyController.editCompany);

companyRoutes.delete('/delete', companyController.deleteCompany);

export default companyRoutes;
