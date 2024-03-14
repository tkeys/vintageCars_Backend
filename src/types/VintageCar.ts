import { Brand } from "./Brand";
import { Condition } from "./Condition";

export interface VintageCar {
  id: string;
  brand: Brand;
  model: string;
  conditions: Condition[];
  description: string;
  year: number;
  price: number;
}
