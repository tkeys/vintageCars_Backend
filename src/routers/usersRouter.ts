import express from "express";
import ordersRouter from "./ordersRouter";
import { hasPermission } from "../middlewares/hasPermission";

const usersRouter = express.Router();

usersRouter.use("/:userId/orderlists", hasPermission, ordersRouter);

export default usersRouter;
