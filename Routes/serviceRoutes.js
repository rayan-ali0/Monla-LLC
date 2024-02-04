import express from "express"
import { serviceController } from "../Controllers/ServiceController.js"
import uploadImage from '../Middlewares/multer.js'
import {verifyToken,checkRole} from '../Middlewares/authentication.js'

export const serviceRoutes= express.Router()

serviceRoutes.post('/create',verifyToken, checkRole(["admin"]),uploadImage.single('image'),serviceController.createService)
serviceRoutes.get('/:id',serviceController.getServiceById)
serviceRoutes.get('/read/all',serviceController.getServices)
serviceRoutes.delete('/:id',verifyToken, checkRole(["admin"]),serviceController.deleteService)
serviceRoutes.put('/update',verifyToken, checkRole(["admin"]),uploadImage.single('image'),serviceController.editService)

