import { Request, Response } from "express";

import vintageCarServices from "../services/vintageCars";

export async function getAllCars(_req: Request, res: Response) {
  const cars = await vintageCarServices.getAllCars();
  res.status(200).json({
    data: cars,
    message: "cars retrieved successfully",
    status: "success",
  });
}
