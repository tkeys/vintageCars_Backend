import VintageCar from '../model/VintageCar';

const getAllCars = async () => {
  return await VintageCar.find();
};

export default { getAllCars };
