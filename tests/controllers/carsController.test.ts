import request from "supertest";
import app from "../../src/app";
import VintageCar from "../../src/model/Car";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";
import mongoose from "mongoose";
import { dummyDaniloAdminData } from "../utils/authUtils";

import { setupDummyUserRegistration } from "../utils/sharedUtils";

let token: string;
let userId: string;
let orderListId: string;
describe("Cars Controller", () => {
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
    const response = await request(app).get("/api/v1/cars");
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });

  it("should create a new car", async () => {
    const response = await request(app)
      .post("/api/v1/cars")
      .send({
        brand: "65fc287d47b3c87edcd0f21a",
        model: "MaybachX",
        conditions: ["65f80bce70ee734ea399ae07"],
        description: "Iconic Luxury car known for its excellence and style.",
        year: 1980,
        price: 970000,
        __v: 0,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("model");
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data).toHaveProperty("year", 1980);
    expect(response.body.data).toHaveProperty("price", 970000);
  });

  it("should get a single car by id", async () => {
    const mockCar = {
      brand: "65fc287d47b3c87edcd0f21a",
      model: "MaybachX",
      conditions: ["65f80bce70ee734ea399ae07"],
      description: "Iconic Luxury car known for its excellence and style.",
      year: 1980,
      price: 970000,
      __v: 0,
    };
    const savedCar = await VintageCar.create(mockCar);
    const _id = savedCar._id.toString();

    const response = await request(app)
      .get(`/api/v1/cars/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("model");
    expect(response.body.data).toHaveProperty("year", 1980);
  });
});
