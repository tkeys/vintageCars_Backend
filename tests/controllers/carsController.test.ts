import request from "supertest";
import app from "../../src/app";
import VintageCar from "../../src/model/VintageCar";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";
import mongoose from "mongoose";
import { UserRegistrationData } from "../../src/types/UserData";
import { registerDummyUser } from "../utils";

let token: string;
let userId: string;
let orderListId: string;
describe("Cars Controller", () => {
  beforeAll(async () => {
    await connectToTestDatabase();
    const userData: UserRegistrationData = {
      email: "dandan@gmail.com",
      userName: "dandan",
      password: "test123",
      firstName: "Danilo",
      lastName: "Cangucu",
    };

    const {
      token: userToken,
      userId: userUserId,
      orderListId: userOrderListId,
    } = await registerDummyUser(userData);

    token = userToken;
    userId = userUserId;
    orderListId = userOrderListId;
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

  /* it("should create a new car", async () => {
    const car = {
      model: "Test Car",
      year: 1990,
      price: 10000,
    };

    const response = await request(app).post("/api/v1/cars").send(car)
    .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("model");
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("year", 1990);
    expect(response.body).toHaveProperty("price", 10000);
  }); */

  it("should get a single car by id", async () => {
    const mockCar = {
      __v: 0,
      _id: "66008215a5d86befd591af34",
      brand: new mongoose.Types.ObjectId(),
      conditions: [new mongoose.Types.ObjectId()],
      description: "Test description",
      model: "Test Car",
      price: 10000,
      year: 1990,
    };
    const savedCar = await VintageCar.create(mockCar);
    const _id = savedCar._id.toString();

    const response = await request(app)
      .get(`/api/v1/cars/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toHaveBeenCalledWith(200);
    //expect(response.body.data).toMatchObject(savedCar);
    /*  expect(response.body.data).toHaveProperty("model");
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data).toHaveProperty("year", 1990); */
  });
});
