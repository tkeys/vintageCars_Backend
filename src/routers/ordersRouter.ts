import express from "express";
import { getOrderListHandler } from "../controllers/orderList";

const ordersRouter = express.Router();

ordersRouter.get("/:orderListId", getOrderListHandler);

export default ordersRouter;
