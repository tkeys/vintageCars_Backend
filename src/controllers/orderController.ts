import Order from "../model/Order";
import { Request, Response, NextFunction } from "express";
import { UserData } from "../types/UserData";
import { UserProperty } from "../types/UserProperty";

//Create new Order
// Route POST /api/v1/orders

const createOrderHandler = async (req: Request, res: Response) => {
  // const { orderItems, paymentMethod, itemsPrice } = req.body;
  const { orderItems, paymentMethod, userId } = req.body;

  res.status(200).json({
    orderItems,
    userId,
    paymentMethod,
  });
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      status: "error",
      message: " No orderItems ",
    });
  }

  //const savedOrderItems = OrderItemService.createOrderItems(orderItems);

  //else {
  //   const order = new Order({
  //     orderItems,
  //     paymentMethod,
  //     itemsPrice,
  //     user: req.params.id,
  //   });
  //   const createdOrder = await order.save();
  //   res.status(201).json({
  //     status: "success",
  //     data: createdOrder,
  //   });
  // }
};

//Get logged in users Orders
// Route GET /api/v1/orders/me
const getMyOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.params });
    res.status(200).json({
      data: orders,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error while getting orders",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  res.send("get order by id");
};

const updateOrderById = async (req: Request, res: Response) => {
  res.send("update order by id");
};

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate("user");
  res.send("get all orders");
};

const deleteOrderById = async (req: Request, res: Response) => {
  res.send("delete order by id");
};

export {
  createOrderHandler,
  getMyOrdersHandler,
  getOrderById,
  updateOrderById,
  getAllOrders,
  deleteOrderById,
};
