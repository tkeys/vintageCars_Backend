import request from "supertest";

import app from "../../src/app";
import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloUserData } from "../utils/authUtils";

let token: string;
let userId: string;
let orderListId: string;

describe("GET /api/v1/users", () => {
  beforeAll(async () => {
    await connectToTestDatabase();

    const registrationData = await setupDummyUserRegistration(
      dummyDaniloUserData
    );
    token = registrationData.token;
    userId = registrationData.userId;
    orderListId = registrationData.orderListId;
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  it("should return a list of users", async () => {
    const res = await request(app)
      .get(`/api/v1/users`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
