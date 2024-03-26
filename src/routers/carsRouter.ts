import express from "express";

import {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
} from "../controllers/carsController";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", createCar);
router.put("/:id", updateCarById);

export default router;
