import express from "express";

import {
  addOrderToOrderListHandler,
  deleteOrderFromOrderListHandler,
  getOrderListHandler,
  //getAllOrderListsHandler,
  updateOrderFromOrderListHandler,
} from "../controllers/orderListController";

const ordersRouter = express.Router();

ordersRouter.get("/:orderListId", getOrderListHandler);
ordersRouter.get(":users/userId/orderlists", getOrderListHandler);

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
