import mongoose, { Document } from "mongoose";
import { VintageCarData } from "../types/VintageCarData";

export type VintageCarDocument = VintageCarData & Document;

const VintageCarSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  conditions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condition",
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<VintageCarDocument>(
  "VintageCars",
  VintageCarSchema
);
