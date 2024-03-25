import mongoose, { Document } from "mongoose";
import { OrderData } from "../types/OrderData";

export type OrderDocument = Document & OrderData;

export const OrderSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VintageCar",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderSum: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
