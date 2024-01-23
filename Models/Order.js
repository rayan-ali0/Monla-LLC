import { Schema, model } from 'mongoose'

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
            enum: ['delivered', 'pending', 'sent', 'initialized']
        },
        total: {
            type: Number,
            required:true
        },
        pruductsOrdered: {
            type: [Object],
            ref: 'Product'
        },
        userId: {
            type: Schema.Types.ObjectId,
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

const order = model('Order', orderSchema)

export default order