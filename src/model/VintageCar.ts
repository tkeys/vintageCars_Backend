import mongoose, { Document } from 'mongoose';
import { VintageCar } from '../types/VintageCar';
import ConditionSchema from './Condition';
import BrandSchema from './Brand';

export type VintageCarDocument = VintageCar & Document;

const VintageCarSchema = new mongoose.Schema({
  //brand: [BrandSchema],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  conditions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Condition',
      required: true,
    },
  ],
  /*  conditions: [ ConditionSchema ], */
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
  'VintageCars',
  VintageCarSchema
);
