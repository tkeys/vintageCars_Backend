import mongoose, { Document } from "mongoose";
import { VintageCarData } from "../types/VintageCarData";

export type VintageCarDocument = VintageCarData & Document;

export const VintageCarSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: [false, "Brand is required"],
  },
  model: {
    type: String,
    required: [true, "Model is required"],
  },
  conditions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condition",
      required: [true, "Condition is required"],
    },
  ],
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  year: {
    type: Number,
    required: true,
    min: [1900, "Year must be at least 1900"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
});

export default mongoose.model<VintageCarDocument>(
  "VintageCar",
  VintageCarSchema
);
