import { Request, Response } from "express";
import orderListService from "../services/orderList";

export async function getOrderListHandler(req: Request, res: Response) {
  try {
    const { orderListId } = req.params;
    const orderList = await orderListService.getOrderList(orderListId);
    res.status(200).json(orderList);
  } catch (error) {
    console.error("Error retrieving order list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
