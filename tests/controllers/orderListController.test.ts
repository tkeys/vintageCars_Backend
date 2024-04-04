import request from "supertest";

import app from "../../src/app";
import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloUserData } from "../utils/authUtils";

let token: string;
let userId: string;
let orderListId: string;

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

describe("OrderList Controller", () => {
  it("should retrieve the order list for a given orderListId", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}/orderlists/${orderListId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.orders).toEqual([]);
  });
});
