import mongoose, { Document } from "mongoose";
import { OrderData } from "../types/OrderData";
import { OrderItemDocument } from "./OrderItem";

export type OrderDocument = Document & OrderData;

export const OrderSchema = new mongoose.Schema({
  // carId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "VintageCar",
  //   required: true,
  // },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"OrderItem"
  }
  ],
  paymentMethod: {
    type: String,
    required:true
  },
  total: {
    type: Number,  
  }
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
