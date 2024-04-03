import request from "supertest";
import app from "../../src/app";
import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import { setupDummyUserRegistration } from "../utils/sharedUtils";

let token: string;

beforeAll(async () => {
  await connectToTestDatabase();

  const registrationData = await setupDummyUserRegistration();
  token = registrationData.token;
});

afterAll(async () => {
  await closeTestDatabase();
});

describe("Auth Controller", () => {
  it("should verify a valid token", async () => {
    const response = await request(app)
      .post("/api/v1/auth/verify")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Token is valid");
  });
});
