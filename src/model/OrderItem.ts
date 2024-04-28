import mongoose, { Document } from 'mongoose'

import { IOrderItem } from '../types/OrderData';

export type OrderItemDocument = Document & IOrderItem;

const orderItemSchema = new mongoose.Schema({
    carId: {
        type: String,
        required:true
    },
    quantity: {
        type: Number,
        default: 1
    },
    subtotal: {
        type: Number,
        required:true
    }

}, {
    timestamps:true
})

export default mongoose.model<OrderItemDocument>("OrderItem", orderItemSchema);