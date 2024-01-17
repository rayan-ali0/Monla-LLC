import express from "express"
import { serviceController } from "../Controllers/ServiceController.js"
import uploadImage from '../Middlewares/multer.js'
export const serviceRoutes= express.Router()

serviceRoutes.post('/create',uploadImage.single('image'),serviceController.createService)
serviceRoutes.get('/:id',serviceController.getServiceById)
serviceRoutes.get('/read/all',serviceController.getServices)
serviceRoutes.delete('/:id',serviceController.deleteService)
serviceRoutes.put('/update',uploadImage.single('image'),serviceController.editService)

