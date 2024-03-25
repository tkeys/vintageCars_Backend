import Order, { OrderDocument } from "../model/Order";
import OrderList, { OrderListDocument } from "../model/OrderList";
import { OrderData } from "../types/OrderData";
import { sanitizeOrder, sanitizeOrderList } from "../utils/ordersUtils";

async function getOrderList(orderListId: string) {
  try {
    const orderList = await OrderList.findById(orderListId).populate({
      path: "orders",
      populate: {
        path: "carId",
        populate: [
          { path: "brand", select: { _id: 0 } },
          { path: "conditions", select: { _id: 0 } },
        ],
        select: { _id: 0, __v: 0 },
      },
      select: { _id: 0, __v: 0 },
    });

    if (orderList) {
      return sanitizeOrderList(orderList);
    }
    return null;
  } catch (error) {
    throw error;
  }
}

async function addOrderToOrderList(orderListId: string, orderData: OrderData) {
  try {
    const orderList = await OrderList.findById(orderListId);
    if (!orderList) {
      throw new Error("Order list not found");
    }

    const order = new Order(orderData);
    await order.save();

    orderList.orders.push(order._id);

    await orderList.save();

    return sanitizeOrder(order);
  } catch (error) {
    throw error;
  }
}

export default { getOrderList, addOrderToOrderList };
