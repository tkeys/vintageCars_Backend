import mongoose, { Document } from 'mongoose';
import { ConditionData, CarCondition } from '../types/ConditionData';

export type ConditionDocument = Document & ConditionData;

const ConditionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(CarCondition),
    required: true,
  },
});

export default mongoose.model<ConditionDocument>('Conditions', ConditionSchema);
