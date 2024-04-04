import request from "supertest";

import app from "../../src/app";
import { UserRegistrationData } from "../../src/types/UserData";

export const dummyDaniloUserData: UserRegistrationData = {
  email: "dandan@gmail.com",
  userName: "dandan",
  password: "test123",
  firstName: "Danilo",
  lastName: "Cangucu",
};

export const dummyDaniloAdminData: UserRegistrationData = {
  email: "admindandan@gmail.com",
  userName: "admindandan",
  password: "admintest123",
  firstName: "Danilo",
  lastName: "Cangucu",
};

export async function registerDummyUser(userData: UserRegistrationData) {
  const response = await request(app)
    .post("/api/v1/auth/register")
    .send(userData);

  const { token, data } = response.body;
  const { id: userId, orderHistory } = data;
  const orderListId = orderHistory[0];

  return { token, userId, orderListId };
}
