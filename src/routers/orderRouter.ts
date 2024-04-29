/* import express from "express";

import {
  createOrderHandler,
  getMyOrdersHandler,
  getOrderById,
  updateOrderById,
  getAllOrders,
  deleteOrderById,
} from "../controllers/orderController";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.get("/", isAdmin, getAllOrders);
router.post("/", createOrderHandler);

router.get("/:orderId", isAdmin, getOrderById);
router.get("/mine", getMyOrdersHandler);

export default router;
 */
