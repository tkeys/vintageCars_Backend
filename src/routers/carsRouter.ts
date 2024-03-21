import express from 'express';

//import { createCar, deleteCar, getCars } from '../controllers/carsController';
import { getAllCars } from '../controllers/carsController';

const router = express.Router();

router.get('/', getAllCars);
/* router.post('/', createCar);
router.delete('/:carId', deleteCar); */

export default router;
