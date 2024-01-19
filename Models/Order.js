import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
    {
        total: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        orderItems: {
            type: [Schema.Types.ObjectId],
            ref: 'OrderItem'
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