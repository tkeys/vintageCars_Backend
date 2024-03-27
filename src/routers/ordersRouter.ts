import express from "express";
import {
  addOrderToOrderListHandler,
  deleteOrderFromOrderListHandler,
  getOrderListHandler,
} from "../controllers/orderList";

const ordersRouter = express.Router();

ordersRouter.get("/:orderListId", getOrderListHandler);
ordersRouter.post("/:orderListId", addOrderToOrderListHandler);
ordersRouter.delete(
  "/:orderListId/orders/:orderId",
  deleteOrderFromOrderListHandler
);

export default ordersRouter;
