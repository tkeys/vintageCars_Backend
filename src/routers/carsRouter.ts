import express, { Request, Response } from 'express';
import { VintageCar } from '../types/VintageCar'; */
import { createCar, deleteCar, getCars } from '../controllers/carsController';

const router = express.Router();

router.get('/', getCars);
router.post('/', createCar);
router.delete('/:carId', deleteCar);

export default router;
