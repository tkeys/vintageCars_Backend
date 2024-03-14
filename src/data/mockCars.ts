import { Brand } from "../types/Brand";
import { Condition } from "../types/Condition";
import { VintageCar } from "../types/VintageCar";

export const vintageCars: VintageCar[] = [
  {
    id: "6d80dab3-3c97-4e2c-9b05-fd9c64af7618",
    brand: Brand.Ford,
    model: "Mustang",
    year: 1967,
    price: 45000,
    description: "Classic American muscle car.",
    conditions: [Condition.Excellent, Condition.Original],
  },
  {
    id: "b7204b5c-1e4b-43aa-8a7b-d7869cbb4f32",
    brand: Brand.Chevrolet,
    model: "Camaro",
    year: 1969,
    price: 40000,
    description: "Iconic pony car known for its performance and style.",
    conditions: [Condition.Restored, Condition.Classic],
  },
  {
    id: "ec13e2ae-4b8d-49ab-9a48-fd0802fcb20f",
    brand: Brand.Porsche,
    model: "911",
    year: 1973,
    price: 90000,
    description:
      "Legendary sports car with timeless design and exhilarating driving experience.",
    conditions: [Condition.Mint, Condition.Collector],
  },
];
