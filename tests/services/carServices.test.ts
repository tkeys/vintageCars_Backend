import request from "supertest";
import app from "../../src/app";
import VintageCar, { VintageCarDocument } from "../../src/model/Car";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";
import vintageCarservices from "../../src/services/vintageCars";
import mongoose from "mongoose";

import { setupDummyUserRegistration } from "../utils/sharedUtils";

let token: string;
let userId: string;
let orderListId: string;
describe("Cars services", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
    const registrationData = await setupDummyUserRegistration();
    token = registrationData.token;
    userId = registrationData.userId;
    orderListId = registrationData.orderListId;
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  afterEach(async () => {
    await VintageCar.deleteMany({});
  });

  it("should get all cars", async () => {
    const Cars = await vintageCarservices.getAllCars(
      1,
      0,
      "",
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER
    );
    expect(Cars.length).toBe(0);
    expect(Cars).toBeInstanceOf(Array);
  });

  describe("getCarById", () => {
    it("should return a car when found by id", async () => {
      const vintageCar = await VintageCar.create({
        _id: new mongoose.Types.ObjectId(),
        model: "test",
        price: 100,
        description: "test",
        year: 2020,
        Brand: new mongoose.Types.ObjectId(),
        conditions: new mongoose.Types.ObjectId(),
      });
      const foundVintageCar = await vintageCarservices.getCarById(
        vintageCar._id
      );
      expect(foundVintageCar).toEqual(vintageCar);
    });
  });
});
