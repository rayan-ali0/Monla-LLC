import Order from "../Models/Order.js"
import OrderItem from "../Models/OrderItem.js"
import Product from '../Models/Product.js'
import User from '../Models/User.js'

export const orderController = {
    createOrder: async (req, res) => {
        const { address, userId, orderItem } = req.body
        const date = new Date()
        const items = await OrderItem.find({ _id: { $in: orderItem } })
        const product = await Product.find({ _id: { $in: items.productId } })
        const user = await User.findById({ _id: userId })
        try {
            const newOrder = await Order.create({
                date,
                address,
                userId: userId,
                orderItems: items.map(item => item._id),
                total: items.quantity * product.price
            })
            await newOrder.save()
            user.order.push(newOrder._id) //user.order is an array attribute in user model which refers to this order model
            newOrder ? res.status(200).json({ message: 'New Order has been created!', Order: newOrder }) :
                res.status(400).send('Error occured, failed to create a new order!')
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
            res.status(200).json({ Orders: orders })
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    },
    getOneOrder: async (req, res) => {
        const id = req.params.id
        try {
            const order = await Order.findById({ _id: id })
            order ? res.status(200).json({ Order: order }) :
                res.status(404).send(`Order with ID ${id} is not found!`)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    },
    getOrdersByUser: async (req, res) => {
        const userId = req.body.userId
        try {
            const orders = await Order.find({ userId: userId })
            orders ? res.status(200).json({ Orders: orders }) :
                res.status(404).send(`Invalid UserID ${userId}!`)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    },
    getOrdersByDate: async (req, res) => {
        const date = req.body.date
        try {
            const orders = await Order.find({ date: date })
            orders ? res.status(200).json({ Orders: orders }) :
                res.status(404).send(`No orders on date ${date} or an error occured!`)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    },

    updateOrder: async (req, res) => {

    },
    
    deleteOrder: async (req, res) => {
        const id = req.params.id
        try {
            const removeOrder = await Order.findByIdAndDelete({ _id: id })
                removeOrder ? res.status(200).send(`Order with ID ${id} has been deleted successfully!`) :
                    res.status(400).send(`Error occured or Order with ID ${id} is not found!`)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
}