import express from "express"
import { serviceController } from "../Controllers/ServiceController"
export const serviceRoutes= express.Router()

serviceRoutes.post('/create',serviceController.createService)
serviceRoutes.get('/:id',serviceController.getServiceById)
serviceRoutes.get('/all',serviceController.getServices)
serviceRoutes.delete('/:id',serviceController.deleteService)
serviceRoutes.put('/update',serviceController.editService)

