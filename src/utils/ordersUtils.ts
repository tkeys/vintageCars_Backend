import { ObjectId } from "mongoose";
import OrderList, { OrderListDocument } from "../model/OrderList";
import VintageCar from "../model/VintageCar";
import { OrderData, OrderListData } from "../types/OrderData";
import Order, { OrderDocument } from "../model/Order";

export async function validateOrderSum(orderData: OrderData): Promise<boolean> {
  try {
    const vintageCar = await VintageCar.findById(orderData.carId);

    if (!vintageCar) {
      throw new Error("VintageCar not found");
    }

    const expectedOrderSum = orderData.quantity * vintageCar.price;

    return expectedOrderSum === orderData.orderSum;
  } catch (error) {
    console.error("Error validating order sum:", error);
    return false;
  }
}

export async function findOrderListById(
  orderListId: string
): Promise<OrderListDocument> {
  const orderList = await OrderList.findById(orderListId);
  if (!orderList) {
    throw new Error("Order list not found");
  }
  return orderList;
}

export function sanitizeOrderList(orderList: OrderListDocument): OrderListData {
  const orders = orderList.orders || [];

  const sanitizedOrders = orders.map((order: any) => sanitizeOrder(order));

  return { id: orderList._id, orders: sanitizedOrders };
}

export function sanitizeOrder(order: OrderDocument): OrderData {
  const { _id, __v, ...sanitizedOrder } = order.toObject();
  return {
    id: _id,
    carId: sanitizedOrder.carId,
    quantity: sanitizedOrder.quantity,
    orderSum: sanitizedOrder.orderSum,
  };
}
