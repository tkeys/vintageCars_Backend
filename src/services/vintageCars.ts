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
  if (searchQuery) {
    return VintageCar.find({
      model: { $regex: searchQuery },
    })
      .sort({ price: -1, year: -1, brand: 1, conditions: 1 })
      .limit(limit)
      .skip(offset)
      .populate({ path: "brand", select: { _id: 0 } })
      .populate({ path: "conditions", select: { _id: 0 } })
      .select({ _id: 0 });
  } else {
    return VintageCar.find()
      .sort({
        price: -1,
        year: -1,
        brand: 1,
        conditions: 1,
      })
      .limit(limit)
      .skip(offset)
      .populate({ path: "brand", select: { _id: 0 } })
      .populate({ path: "conditions", select: { _id: 0 } })
      .select({ _id: 0 });
  }
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
  const foundCar = await VintageCar.findById(id)
    .populate({ path: "brand", select: { _id: 0 } })
    .populate({ path: "conditions", select: { _id: 0 } })
    .select({ _id: 0 });
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
