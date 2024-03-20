import VintageCar from '../model/VintageCar';

const getCars = async () => {
  return await VintageCar.find();
};

export { getCars };
