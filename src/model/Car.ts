import mongoose, { Document } from "mongoose";
import { VintageCarData } from "../types/VintageCarData";

export type VintageCarDocument = VintageCarData & Document;

export const VintageCarSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: [true, "Brand is required"],
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
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [0, "Rating cannot be negative"],
    max: [5, "Rating cannot be greater than 5"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
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
