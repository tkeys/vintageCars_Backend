import mongoose, { Document } from 'mongoose';
import { VintageCar } from '../types/VintageCar';
import ConditionSchema from './Condition';
import BrandSchema from './Brand';

export type VintageCarDocument = VintageCar & Document;

const VintageCarSchema = new mongoose.Schema({
  brand: [BrandSchema],
  model: {
    type: String,
    required: true,
  },
  conditions: [ConditionSchema],
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
  'VintageCar',
  VintageCarSchema
);
