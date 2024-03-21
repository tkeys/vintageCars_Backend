import express from 'express';

import { getAllCars } from '../controllers/carsController';

const router = express.Router();

router.get("/", getAllCars);

export default router;
