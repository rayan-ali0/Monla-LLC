import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
    {
        address: {
            type: String,
            required: true
        },
        orderNumber: {
            type: Number
        },
        orderedDate: {
            type: Date
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
            type: Number
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
)

const order = model('Order', orderSchema)

export default order