import { Schema, model } from "mongoose"

const orderItemSchema = new Schema(
    {
        quantity: {
            type: Number,
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    }
)

const orderItem = model('OrderItem', orderItemSchema)

export default orderItem