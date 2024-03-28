import { Request, Response } from "express";

import vintageCarServices from "../services/vintageCars";
import VintageCar from "../model/VintageCar";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "../errors/ApiError";
import mongoose from "mongoose";

export async function getAllCars(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const searchQuery = req.query.searchQuery as string;

    const minPrice = parseInt(req.query.minPrice as string);
    const maxPrice = parseInt(req.query.maxPrice as string);
    const totalCars = await VintageCar.find().countDocuments();

    const cars = await vintageCarServices.getAllCars(
      limit,
      offset,
      searchQuery,
      minPrice,
      maxPrice
    );
    res.status(200).json({
      data: cars,
      totalCars,
      message: ` ${totalCars} total number of cars retrieved successfully`,
      status: "success",
    });
  } catch (error) {
    if (error instanceof InternalServerError) {
      res.status(500).json({
        message: "Internal server error",
        status: "error",
      });
    }
  }
}
export async function createCar(req: Request, res: Response) {
  try {
    const newData = new VintageCar(req.body);
    const newVintageCar = await vintageCarServices.createCar(newData);
    res.status(201).json({
      data: newVintageCar,
      message: "car created successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
}
export async function getCarById(req: Request, res: Response) {
  try {
    const foundVintageCar = await vintageCarServices.getCarById(req.params.id);
    res.status(200).json({
      data: foundVintageCar,
      message: "car retrieved by id successfully",
      status: "success",
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        message: `car not found by id ${req.params.id}`,
        status: "error",
      });
    }
    if (error instanceof mongoose.Error.CastError) {
      res.status(404).json({
        message: "wrong id format",
        status: "error",
      });
    }
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
}
export async function updateCarById(req: Request, res: Response) {
  try {
    const updatedVintageCar = await vintageCarServices.updateCarById(
      req.params.id,
      req.body
    );
    res.status(200).json({
      data: updatedVintageCar,
      message: "car updated by id successfully",
      status: "success",
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        message: "Internal server error",
        status: "error",
      });
    }
  }
}

export async function deleteCarById(req: Request, res: Response) {
  try {
    const deleted = await vintageCarServices.deleteCarById(req.params.id);
    console.log(deleted);
    res.status(200).json({
      message: "Car deleted successfully",
      status: "success",
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
