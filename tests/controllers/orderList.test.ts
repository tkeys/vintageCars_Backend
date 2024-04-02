import request from "supertest";

import app from "../../src/app";
import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import { UserRegistrationData } from "../../src/types/UserData";
import { registerDummyUser } from "../utils";

let token: string;
let userId: string;
let orderListId: string;

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

describe("OrderList Controller", () => {
  it("should retrieve the order list for a given orderListId", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}/orderlists/${orderListId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.orders).toEqual([]);
  });
});
