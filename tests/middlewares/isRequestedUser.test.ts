import { Request, Response } from "express";
import { isRequestedUser } from "../../src/middlewares/isRequestedUser";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloUserData } from "../utils/authUtils";
import { closeTestDatabase, connectToTestDatabase } from "../db-helper";

const mockNextFunction = jest.fn();
let token: string;
let userId: string;
let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

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

beforeEach(() => {
  mockRequest = { headers: {}, params: { userId } } as Partial<Request>;
  mockResponse = {
    status: jest.fn().mockReturnValue({ json: jest.fn() }),
    json: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("isRequestedUser middleware", () => {
  it("should call next() if user is the requested user and not banned", () => {
    mockRequest.headers = { authorization: `Bearer ${token}` };

    isRequestedUser(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
