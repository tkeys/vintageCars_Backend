import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import authServices from "../../src/services/authService";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloUserData } from "../utils/authUtils";

beforeAll(async () => {
  await connectToTestDatabase();
  await setupDummyUserRegistration(dummyDaniloUserData);
});

afterAll(async () => {
  await closeTestDatabase();
});

describe("Authentication Services", () => {
  describe("loginUser", () => {
    it("should log in an existing user", async () => {
      const token = await authServices.loginUser(
        dummyDaniloUserData.email!,
        dummyDaniloUserData.password!
      );

      expect(token).toBeDefined();
    });
  });
});
