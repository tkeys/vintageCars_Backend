import request from "supertest";
import app from "../../src/app";
import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloUserData } from "../utils/authUtils";

import usersService from "../../src/services/usersService";

let token: string;
let userId: string;

describe("GET /api/v1/users", () => {
  beforeAll(async () => {
    await connectToTestDatabase();

    const registrationData = await setupDummyUserRegistration(
      dummyDaniloUserData
    );
    token = registrationData.token;
    userId = registrationData.userId;
  });

  afterAll(async () => {
    await closeTestDatabase();
  });
  //

  it("should return a users", async () => {
    const userList = await usersService.getAllUsers();
    expect(userList.length).toEqual(1);
  });
});
