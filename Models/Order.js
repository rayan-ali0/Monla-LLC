// import { Schema, model } from 'mongoose'
import mongoose from "mongoose";

const Schema = mongoose.Schema;


const orderSchema = new Schema(
    {
        orderNumber: {
            type: Number,
            default:1
        },
        userName:{
            type: String,
            required: true
        },
        userEmail:{
            type: String,
            required: true
        },
        userPhone:{
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        deliverDate: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ['pending', 'sent', 'accepted','rejected','delivered'],
            default: "pending"
        },
        total: {
            type: Number,
            required:true
        },
        // pruductsOrdered: {
        //     type: [Object],
        //     ref: 'Product'
        // },
        productsOrdered: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }],
        userId: {
            // type: Schema.Types.ObjectId,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        shippingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shipping',
            required: true
        },
    }
    ,
{
    timestamps:true
}

)
// const order = model('Order', orderSchema)

// export default order
export default mongoose.model("Order", orderSchema);