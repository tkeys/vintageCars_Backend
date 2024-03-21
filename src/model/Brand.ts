import mongoose, { Document } from 'mongoose';
import { BrandData, BrandName } from '../types/BrandData';

export type BrandDocument = BrandData & Document;

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(BrandName),
    required: true,
  },
});

export default mongoose.model<BrandDocument>('Brands', BrandSchema);
