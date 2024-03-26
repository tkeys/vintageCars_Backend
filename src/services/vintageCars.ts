import { ForbiddenError, NotFoundError } from "../errors/ApiError";
import VintageCar, { VintageCarDocument } from "../model/VintageCar";
import { VintageCarData } from "../types/VintageCarData";

const getAllCars = async (
  limit: number,
  offset: number,
  searchQuery: string,
  minPrice: number,
  maxPrice: number
): Promise<VintageCarDocument[]> => {
  return VintageCar.find(/* {
    model: { $regex: searchQuery },
    price: { $gte: minPrice, $lte: maxPrice },
  } */)
    .sort({ price: -1, year: -1, brand: 1, conditions: 1 })
    .limit(limit)
    .skip(offset);

  /* const allCars = await VintageCar.find()

    .sort({ price: -1, year: -1, brand: 1, conditions: 1 })
    .limit(limit)
    .skip(offset)
    .find()

    .exec();

  if (allCars) {
    return allCars;
  }

  throw new NotFoundError(""); */
};

const createCar = async (
  vintagecar: VintageCarDocument
): Promise<VintageCarDocument> => {
  return await vintagecar.save();
};

const getCarById = async (id: string): Promise<VintageCarDocument> => {
  const foundCar = await VintageCar.findById(id);
  if (foundCar) {
    return foundCar;
  }
  throw new NotFoundError("");
};
const updateCarById = async (id: string, newInfo: VintageCarData) => {
  const updatedCar = await VintageCar.findByIdAndUpdate(id, newInfo, {
    new: true,
  });
  if (updatedCar) {
    return updatedCar;
  }
};

const deleteCarById = async (id: string) => {
  const deletedCar = await VintageCar.findByIdAndDelete(id);
  if (deletedCar) {
    return deletedCar;
  }
};

export default {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
};
