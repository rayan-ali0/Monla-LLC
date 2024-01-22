import express from 'express'
import { orderController } from '../Controllers/OrderController.js'
import { verifyToken, checkRole } from '../Middlewares/authentication.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', verifyToken, checkRole(["customer"]), orderController.createOrder)
orderRoutes.get('/read', verifyToken, checkRole(["admin"]), orderController.getAllOrders)
orderRoutes.get('/read/:id', verifyToken, orderController.getOrderById)
orderRoutes.get('/read/byOrderNumber', verifyToken, checkRole(["admin"]), orderController.getOrderByOrderNumber)
orderRoutes.get('/read/byUserId', verifyToken, checkRole(["admin"]), orderController.getOrdersByUser)
orderRoutes.get('/read/byDate', verifyToken, checkRole(["admin"]), orderController.getOrdersByDate)
orderRoutes.patch('/update/:id', verifyToken, checkRole(["admin"]), orderController.updateOrder)
orderRoutes.delete('/delete/:id', verifyToken, orderController.deleteOrder)

export default orderRoutes