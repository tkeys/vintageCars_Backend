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

  /*  afterEach(async () => {
    await VintageCar.deleteMany({});
  }); */
  /* it("should get all cars", async () => {
    const response = await request(app).get("/api/v1/cars");
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  }); */

  it("should create a new car", async () => {
    const vintagecar: VintageCarDocument = new VintageCar({
      model: "BMW",
      price: 10000,
      year: 1990,
      brand: "this is a brand",
      conditions: ["this is a condition"],
      description: "this is a description",
    });
    const newVintageCar = await vintageCarservices.createCar(vintagecar);
    expect(newVintageCar).toHaveProperty("model");
  });
});
