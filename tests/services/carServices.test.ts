import VintageCar from "../../src/model/Car";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";
import vintageCarsService from "../../src/services/vintageCarsService";
import { dummyDaniloAdminData } from "../utils/authUtils";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { mockVintageCar } from "../utils/carsUtils";

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
      const vintageCar = await VintageCar.create(mockVintageCar);
      const foundVintageCar = await vintageCarsService.getCarById(
        vintageCar._id
      );
      expect(foundVintageCar).toHaveProperty("model");
    });
  });
});
