import mongoose, { Document } from 'mongoose';
import { BrandData, BrandName } from '../types/BrandData';

export type BrandDocument = BrandData & Document;

export const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(BrandName),
    required: true,
  },
});