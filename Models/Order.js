import { Schema, model } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const orderSchema = new Schema(
    {
        total: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        orderedDate: {
            type: Date,
            required: true
        },
        deliverDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ['Delivered', 'Not Delivered'],
            default: 'Not Delivered',
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

orderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderNumber', startAt: 1 })

const order = model('Order', orderSchema)

export default order