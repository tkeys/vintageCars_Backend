import express, { Request, Response } from 'express';
import { vintageCars } from '../data/mockCars';
import { VintageCar } from '../types/VintageCar';

let vintageCarsInServer = [...vintageCars];

// query
// http://localhost:8080/api/v1/cars?model=Generic&&conditions=Excellent
// ?offset=0&limit=10
// search
// filter

export function getCars(request: Request, response: Response) {
  if (request.query.model) {
    const modelQuery = request.query.model as string;
    const filteredCars = vintageCarsInServer.filter((car) =>
      car.model.toLowerCase().includes(modelQuery.toLowerCase())
    );
    response.status(200).json({
      data: filteredCars,
      message: 'car found by model successful',
      status: 'sucess',
    });
  }
  // Filter cars by conditions
  else if (request.query.conditions) {
    const conditionsQuery = request.query.conditions as string;
    const filteredCars = vintageCarsInServer.filter((car) =>
      car.conditions.some((condition) =>
        condition.toLowerCase().includes(conditionsQuery.toLowerCase())
      )
    );
    response.status(200).json({
      data: filteredCars,
      message: 'car found by conditions successful',
      status: 'sucess',
    });
  }
  // Return all cars
  else {
    response.status(200).json({
      data: vintageCarsInServer,
      message: 'cars retrieved successfully',
      status: 'success',
    });
  }
}

// base url:"http://localhost:8080/api/v1/cars/"
// router.get("/", (request: Request, response: Response) => {
//   response.status(200).json(cars);
// });

export function createCar(request: Request, response: Response) {
  const newVintageCar = request.body;
  vintageCarsInServer.push(newVintageCar);
  if (!newVintageCar) {
    response.status(400).json({ message: 'Car details are required' });
  }
  response.status(201).json({
    data: newVintageCar,
    message: 'new vintage car added successfully',
  });
}

// base url:"http://localhost:8080/api/v1/cars/:carId"
export function deleteCar(request: Request, response: Response) {
  const newVintageCar = request.body;
  vintageCarsInServer.push(newVintageCar);
  if (!newVintageCar) {
    response.status(400).json({ message: 'Car details are required' });
  }
  response.status(201).json({
    data: newVintageCar,
    message: 'new vintage car added successfully',
  });
}
