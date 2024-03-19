import mongoose, { Document } from "mongoose";
import { ConditionData } from "../types/ConditionData";

export type ConditionDocument = Document & ConditionData;

const ConditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ConditionDocument>("Conditions", ConditionSchema);
