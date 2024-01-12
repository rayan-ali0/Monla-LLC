import OrderItem from "../Models/OrderItem.js"
import Order from "../Models/Order.js"
import Product from '../Models/Product.js'

export const orderItemController = {
    createOrderItem: async (req, res) => {
        const { quantity, orderId, productId, orderMore } = req.body
        const order = await Order.findById({ _id: orderId })
        const product = await Product.findById({ _id: productId })
        if (!quantity)
            return res.status(400).send(`Please specify how many item(s) you need to purchase!`)
        try {
            const newOrderItem = await Order.create({
                quantity,
                productId,
                orderId
            })
            await newOrderItem.save()
            await order.orderItems.push(newOrderItem._id)
            await product.orderItems.push(newOrderItem._id)
            newOrderItem ? res.status(200).send(`You added ${quantity} ${product.title}, you can add more as your request!`) :
                res.status(400).send('Error occured, Check your variants again please!')
        }
        catch (error) {
            res.status(404).json({ status: 404, error: error })
        }
    }
}