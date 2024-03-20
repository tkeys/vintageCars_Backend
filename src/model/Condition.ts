import mongoose, { Document, model } from 'mongoose';
import { Condition } from '../types/Condition';

const Schema = mongoose.Schema;

export type ConditionDocument = Condition & Document;

const ConditionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(Condition),
    required: true,
  },
});

export default mongoose.model<ConditionDocument>('Condition', ConditionSchema);
