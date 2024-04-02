import express from "express";

import {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
} from "../controllers/carsController";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", isAdmin, createCar);
router.put("/:id", isAdmin, updateCarById);
router.delete("/:id", isAdmin, deleteCarById);

export default router;
