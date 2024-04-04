import request from "supertest";
import app from "../../src/app";
import VintageCar, { VintageCarDocument } from "../../src/model/Car";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";
import vintageCarsService from "../../src/services/vintageCarsService";
import mongoose from "mongoose";
import { dummyDaniloAdminData } from "../utils/authUtils";

import { setupDummyUserRegistration } from "../utils/sharedUtils";

let token: string;
let userId: string;
let orderListId: string;
describe("Cars services", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
    const registrationData = await setupDummyUserRegistration(
      dummyDaniloAdminData
    );
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
    const Cars = await vintageCarsService.getAllCars(
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
        brand: "65fc287d47b3c87edcd0f21a",
        model: "MaybachX",
        conditions: ["65f80bce70ee734ea399ae07"],
        description: "Iconic Luxury car known for its excellence and style.",
        year: 1980,
        price: 970000,
        __v: 0,
      });
      const foundVintageCar = await vintageCarsService.getCarById(
        vintageCar._id
      );
      expect(foundVintageCar).toHaveProperty("model");
    });
  });
});
