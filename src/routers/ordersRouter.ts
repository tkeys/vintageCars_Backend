import express from "express";
import {
  addOrderToOrderListHandler,
  deleteOrderFromOrderListHandler,
  getOrderListHandler,
  updateOrderFromOrderListHandler,
} from "../controllers/orderList";

const ordersRouter = express.Router();

ordersRouter.get("/:orderListId", getOrderListHandler);
ordersRouter.post("/:orderListId", addOrderToOrderListHandler);
ordersRouter.delete(
  "/:orderListId/orders/:orderId",
  deleteOrderFromOrderListHandler
);
ordersRouter.put(
  "/:orderListId/orders/:orderId",
  updateOrderFromOrderListHandler
);

export default ordersRouter;
