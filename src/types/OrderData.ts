import mongoose from "mongoose";
import { VintageCarData } from "./VintageCarData";

export interface OrderData {
  id: string;
  carId: string | VintageCarData;
  quantity: number;
  orderSum: number;
  paymentMethod: string;
  itemsPrice: number;
}
export interface IOrderItem{
  _id: string,
  carId: string,
  quantity: string,
  subtotal:number
}
export interface OrderListData {
  id: string;
  orders: OrderData[] | mongoose.Types.ObjectId[];
}

