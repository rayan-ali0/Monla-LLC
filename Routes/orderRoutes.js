import express from 'express'
import { orderController } from '../Controllers/OrderController.js'
import { verifyToken, checkRole } from '../Middlewares/authentication.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', orderController.createOrder)
orderRoutes.get('/read', verifyToken, checkRole(["admin"]), orderController.getAllOrders)
orderRoutes.get('/read/:id',  orderController.getOrderById)
orderRoutes.get('/byOrderNumber', verifyToken, checkRole(["admin"]), orderController.getOrderByOrderNumber)
orderRoutes.get('/byUserId', verifyToken, checkRole(["admin"]), orderController.getOrdersByUser)
orderRoutes.get('/byDate', verifyToken, checkRole(["admin"]), orderController.getOrdersByDate)
orderRoutes.patch('/update/:id',verifyToken, checkRole(["admin"]), orderController.updateOrder)
orderRoutes.delete('/delete/:id',verifyToken, checkRole(["admin"]), orderController.deleteOrder)
orderRoutes.get('/recents/all',verifyToken, checkRole(["admin"]),orderController.recents)
export default orderRoutes