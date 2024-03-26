import express from "express";
import {
  addOrderToOrderListHandler,
  getOrderListHandler,
} from "../controllers/orderList";

const ordersRouter = express.Router();

ordersRouter.get("/:orderListId", getOrderListHandler);
ordersRouter.post("/:orderListId", addOrderToOrderListHandler);

export default ordersRouter;
