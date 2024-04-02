import express from "express";
import ordersRouter from "./ordersRouter";
import { hasPermission } from "../middlewares/hasPermission";
import { isRequestedUser } from "../middlewares/isRequestedUser";
import {
  changePasswordHandler,
  recoverPasswordHandler,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.use("/:userId/orderlists", hasPermission, ordersRouter);
usersRouter.get(
  "/:userId/recover-password",
  isRequestedUser,
  recoverPasswordHandler
);
usersRouter.post(
  "/:userId/change-password",
  isRequestedUser,
  changePasswordHandler
);

export default usersRouter;
