import express, { Request, Response } from 'express';
import { vintageCars } from '../data/mockCars';
import { VintageCar } from '../types/VintageCar';

let vintageCarsInServer = [...vintageCars];

const router = express.Router();

// query
// http://localhost:8080/api/v1/cars?model=Generic
// ?offset=0&limit=10
// search
// filter
router.get('/', (request: Request, response: Response) => {
  console.log(request);
  response
    .status(200)
    .json({ data: CanvasRenderingContext2D, message: 'Success', status: 200 });
});

// base url:"http://localhost:8080/api/v1/cars/"
// router.get("/", (request: Request, response: Response) => {
//   response.status(200).json(cars);
// });

router.post('/', (request: Request, response: Response) => {
  const newVintageCar = request.body;
  vintageCarsInServer.push(newVintageCar);
  response.status(201).json(newVintageCar);
});

// base url:"http://localhost:8080/api/v1/cars/:carId"
router.delete('/:carId', (request: Request, response: Response) => {
  const vintageCarId = request.params.carId;
  const carToDelete = vintageCarsInServer.filter(
    (vintageCar: VintageCar) => vintageCar.id !== vintageCarId
  );

  // comment by DANILO: if deleted:
  response.sendStatus(204);
  // comment by DANILO: if not:
});

export default router;
