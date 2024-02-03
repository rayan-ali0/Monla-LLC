import Order from "../Models/Order.js"
import Product from '../Models/Product.js'
import User from '../Models/User.js'
// import Shipping from '../Models/Shipping.js'

export const orderController = {
    createOrder: async (req, res) => {
        const { userName, userEmail, total, shippingId, userPhone, address, userId, productsOrdered } = req.body
        // const orderedDate = new Date()
        // const user = await User.findById({ _id: userId })
        const orders = await Order.find()
        // let total = 0,
        let count = orders.length + 1
        // for (let product in productsOrdered)
        //     total += (product[i].quantity * product[i].price)
        try {
            const newOrder = await Order.create({
                userName,
                userEmail,
                shippingId,
                userPhone,
                address,
                orderNumber: count,
                status: 'pending',
                total,
                userId,
                productsOrdered
            })
            if (newOrder) {
                for (let i = 0; i < productsOrdered.length; i++) {
                    const product = await Product.findById(productsOrdered[i].productId)
                    if (product) {
                        console.log(product.stock)
                        product.stock -= Number(productsOrdered[i].quantity)
                        await product.save()
                    }
                    else {
                        res.status(404).json({ message: "Product Not Found" })
                    }
                }
            }
            await newOrder.save()
            return res.status(200).json({ message: 'Your Order has been created successfuly!', Order: newOrder })            // newOrder ? res.status(200).json({ message: 'New Order has been created!', Order: newOrder }) :

        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
            return res.status(200).json({ Orders: orders })
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    getOrderById: async (req, res) => {
        const id = req.params.id
        try {
            const order = await Order.findById(id)
            if (order) {
                return res.status(200).json({ Order: order })
            }
            else {
                res.status(404).send(`Order with ID ${id} is not found!`)

            }
            // order ? res.status(200).json({ Order: order }) :
            //    res.status(404).send(`Order with ID ${id} is not found!`)
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    getOrderByOrderNumber: async (req, res) => {
        const orderNumber = req.body.orderNumber
        try {
            const order = await Order.findOne({ orderNumber: orderNumber })
            if (order) {
                return res.status(200).json({ Order: order })
            }
            else {
                return res.status(404).send(`Order with Order Number ${orderNumber} doesn't exist!`)

            }
            // order ? res.status(200).json({ Order: order }) :
            // res.status(404).send(`Order with Order Number ${orderNumber} doesn't exist!`)
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
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
            return res.status(404).json({ status: 404, error: error })
        }
    },
    getOrdersByDate: async (req, res) => {
        const date = req.body.date
        try {
            const orders = await Order.find({ createdAt: date })
            orders ? res.status(200).json({ Orders: orders }) :
                res.status(404).send(`No orders on date ${date} or an error occured!`)
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },

    updateOrder: async (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        let deliverDate = null;

        try {
            if (status === 'delivered') {
                deliverDate = new Date();
            }
            if (status === 'rejected') {
                const order = await Order.findById(id);
                if (order) {
                    for (let i = 0; i < order.productsOrdered.length; i++) {
                        const product = await Product.findById(order.productsOrdered[i].productId);
                        if (product) {
                            product.stock += order.productsOrdered[i].quantity;
                            await product.save();
                        }
                    }
                }
            }

            const editOrder = await Order.findByIdAndUpdate(id, {
                status,
                deliverDate,
            });

            if (editOrder) {
                return res.status(200).json({ message: "Your Order has been successfully updated" });
            }

            return res.status(400).send(`Error occurred or Order with ID ${id} is not found!`);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },


    deleteOrder: async (req, res) => {
        const id = req.params.id;
        try {
            const removeOrder = await Order.findById(id);
            if (removeOrder) {
                if (removeOrder.status !== "delivered" && removeOrder.status !== "rejected") {
                    return res.status(400).json({ message: "You can only delete delivered or rejected Orders" });
                } else {
                    await Order.deleteOne({ _id: removeOrder._id });
                    return res.status(200).send(`Order with ID ${id} has been deleted successfully!`);
                }
                
            } else {
                return res.status(400).json({ message: "Order not found" });
            }
        } catch (error) {
            return res.status(404).json({ status: 404, error: error });
        }
    },
    
    
    
    recents: async (req, res) => {
        try {
            const recentsOrders = await Order.find().sort({ createdAt: -1 }).limit(6).populate(["shippingId"])
            if (recentsOrders) {
                return res.status(200).json(recentsOrders)
            }
            return res.status(404).json({ message: "Error fetching recents Orders" })

        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    }
}