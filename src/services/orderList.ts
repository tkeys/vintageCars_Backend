import OrderList, { OrderListDocument } from "../model/OrderList";

export async function getOrderList(orderListId: string) {
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
      select: { _id: 0 },
    });

    if (orderList) {
      const orderListObject = orderList.toObject() as OrderListDocument;
      delete orderListObject._id;
      return orderListObject;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default { getOrderList };
