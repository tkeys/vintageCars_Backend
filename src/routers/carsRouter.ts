import express from "express";

import {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
} from "../controllers/carsController";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", isAdmin, getCarById);
router.post("/", isAdmin, createCar);
router.put("/:id", isAdmin, updateCarById);

export default router;
