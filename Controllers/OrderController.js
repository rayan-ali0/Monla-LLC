import Order from "../Models/Order.js"
import OrderItem from "../Models/OrderItem.js"
import Product from '../Models/Product.js'
import User from '../Models/User.js'

export const orderController = {
    createOrder: async (req, res) => {
        const { address, userId, orderItems, status } = req.body
        const deliverDate = null, orderedDate = new Date()
        const items = await OrderItem.find({ _id: { $in: orderItems } })
        const productIds = items.map(item => item.productId) // we create an array to contain all the products ID in the order_item table
        const products = await Product.find({ _id: { $in: productIds } }) // this array is declared from the product table in order to get the price attribute
        const user = await User.findById({ _id: userId }) // this declaration may be updated later based on authentication

        let total = 0
        for (let i=0; i<items.length; i++)
            total += items[i].quantity * products[i].price

        try {
            const newOrder = await Order.create({
                status,
                orderedDate,
                deliverDate,
                address,
                userId: userId,
                orderItems: items.map(item => item._id),
                total
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
    getOrderById: async (req, res) => {
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
    getOrderByOrderNumber: async (req, res) => {
        const orderNumber = req.body.orderNumber
        try {
            const order = await Order.findOne({ orderNumber: orderNumber })
            order ? res.status(200).json({ Order: order }) : 
                res.status(404).send(`Order with Order Number ${orderNumber} doesn't exist!`)
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
        const id = req.params.id
        const { address, orderItems, status } = req.body
        let deliverDate = null, total = 0
        const items = await OrderItem.find({ _id: { $in: orderItems } })
        const productIds = items.map(item => item.productId)
        const products = await Product.find({ _id: { $in: productIds } })

        for (let i=0; i<items.length; i++)
            total += items[i].quantity * products[i].price

        (status === 'Delivered') ? deliverDate = new Date() : deliverDate = null

        try {
            const editOrder = await Order.findByIdAndUpdate({ _id: id }, { 
                address,
                status,
                deliverDate,
                orderItems,
                total
             })
            editOrder ? res.status(200).send(`Order with ID ${id} has been updated successfully!`) : 
             res.status(400).send(`Error occured or Order with ID ${id} is not found!`)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    },
    deleteOrder: async (req, res) => {
        const id = req.params.id
        try {
            const user = await User.findOne({ order: { $in: id } })
            await user.order.filter(item => item.toString() !== id)
            const removeOrder = await Order.findByIdAndDelete({ _id: id })
                removeOrder ? res.status(200).send(`Order with ID ${id} has been deleted successfully!`) :
                    res.status(400).send(`Error occured or Order with ID ${id} is not found!`)
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
}