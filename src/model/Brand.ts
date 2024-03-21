import mongoose, { Document } from 'mongoose';
import { Brand } from '../types/Brand';

export type BrandDocument = Brand & Document;

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(Brand),
    required: true,
  },
});

export default mongoose.model<BrandDocument>('Brands', BrandSchema);
