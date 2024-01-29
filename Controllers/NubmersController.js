import Order from "../Models/Order.js"
import Product from '../Models/Product.js'
import User from '../Models/User.js'
import Shipping from '../Models/Shipping.js'

export const Numbers = {

    getNumbers:async(req,res)=>{
try{
    const users=await User.find()
    const usersNb=users.length

    const orders=await Order.find()
    const ordersNumber=orders.length

    const products=await Product.find()
    const productsNb=products.length

    const ordersDelivered=await Order.find({status:'delivered'})
    const deliveredNb=ordersDelivered.length

    let totalStock =0
    products.forEach(product=>
        {
            totalStock+= product.stock
        })

        res.status(200).json({
            ordersNumber,
            totalStock,
            productsNb,
            deliveredNb,
            usersNb
        })
}
catch(error){
    res.status(400).json({message:"error fetching your numbers"})
}
}
}