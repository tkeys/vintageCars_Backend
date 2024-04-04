import { Request, Response } from "express";

import { isAdmin } from "../../src/middlewares/isAdmin";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloAdminData } from "../utils/authUtils";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";

const mockNextFunction = jest.fn();
let token: string;
let mockRequest: Request;
let mockResponse: Partial<Response>;

beforeAll(async () => {
  await connectToTestDatabase();

  const registrationData = await setupDummyUserRegistration(
    dummyDaniloAdminData
  );
  token = registrationData.token;
});

afterAll(async () => {
  await closeTestDatabase();
});

beforeEach(() => {
  mockRequest = { headers: {} } as Request;
  mockResponse = {
    status: jest.fn().mockReturnValue({ json: jest.fn() }),
    json: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("isAdmin middleware", () => {
  it("should call next() if user is an admin", () => {
    mockRequest.headers = { authorization: `Bearer ${token}` };

    isAdmin(mockRequest, mockResponse as Response, mockNextFunction);

    expect(mockNextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
