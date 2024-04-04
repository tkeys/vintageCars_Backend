import { Request, Response } from "express";

import vintageCarServices from "../services/vintageCarsService";
import VintageCar from "../model/Car";

import mongoose from "mongoose";

export async function getAllCars(req: Request, res: Response) {
  try {
    const {
      limit = 10,
      offset = 0,
      searchQuery = "",
      minPrice = 0,
      maxPrice = Infinity,
    } = req.query;

    const cars = await vintageCarServices.getAllCars(
      Number(limit),
      Number(offset),
      searchQuery as string,
      Number(minPrice),
      Number(maxPrice)
    );
    res.status(200).json({
      data: cars,
      message: "cars retrieved successfully",
      status: "success",
    });
  } catch (error) {
    if (error) {
      console.error("Error while fetching cars:", error);
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
    //console.error(error);
    res.status(500).json({
      message: "Internal server Error",
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
    if (error) {
      console.error(error, "so we know");
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
      console.error(error);
      res.status(500).json({
        message: "internal server Error",
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
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
