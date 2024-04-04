import express from "express";

import { validateRequestBody } from "../utils/authUtils";
import registerSchema from "../validators/registerSchema";
import loginSchema from "../validators/loginSchema";
import {
  loginUserHandler,
  registerUserHandler,
  verifyTokenHandler,
} from "../controllers/authController";

const router = express.Router();

router.post(
  "/register",
  validateRequestBody(registerSchema),
  registerUserHandler
);
router.post("/login", validateRequestBody(loginSchema), loginUserHandler);
router.post("/verify", verifyTokenHandler);

export default router;
