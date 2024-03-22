import { BrandName } from "./BrandData";
import { CarCondition } from "./ConditionData";

export interface VintageCarData {
  id: string;
  brand: BrandName;
  model: string;
  conditions: CarCondition[];
  description: string;
  year: number;
  price: number;
}
