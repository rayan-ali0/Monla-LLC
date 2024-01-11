import express from 'express'
import { orderController } from '../Controllers/OrderController.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', orderController.createOrder)
orderRoutes.get('/read', orderController.getAllOrders)
orderRoutes.get('/read/:id', orderController.getOrderById)
orderRoutes.get('/read/byOrderNumber', orderController.getOrderByOrderNumber)
orderRoutes.get('/read/byUserId', orderController.getOrdersByUser)
orderRoutes.get('/read/byDate', orderController.getOrdersByDate)
orderRoutes.patch('/update/:id', orderController.updateOrder)
orderRoutes.delete('/delete/:id', orderController.deleteOrder)

export default orderRoutes