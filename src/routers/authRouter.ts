import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { users } from "../data/mockUsers";
import { User } from "../types/User";
import { Role } from "../types/Role";
import {
  comparePasswords,
  extractJwtToken,
  extractPropertyFromJwt,
  generateAuthToken,
  hashPassword,
  isEmailUnique,
  isUserNameUnique,
  validateRequestBody,
  verifyJwtToken,
} from "../utils/authUtils";
import { findUserByProperty } from "../utils/usersUtils";
import registerSchema from "../validators/registerSchema";
import loginSchema from "../validators/loginSchema";
import { UserProperty } from "../types/UserProperty";
import { JwtProperty } from "../types/JwtProperty";

export let usersInServer = [...users];

const router = express.Router();

router.post(
  "/register",
  validateRequestBody(registerSchema),
  async (request: Request, response: Response) => {
    const userFromRequestBody = request.body as User;

    if (!isUserNameUnique(userFromRequestBody.userName, usersInServer)) {
      return response.status(400).json({
        status: "fail",
        message: "Username already exists",
      });
    }

    if (!isEmailUnique(userFromRequestBody.email, usersInServer)) {
      return response.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    try {
      const hashedPassword = await hashPassword(userFromRequestBody.password!);
      userFromRequestBody.hashedPassword = hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }

    userFromRequestBody.id = uuidv4();
    userFromRequestBody.role = Role.Customer;
    userFromRequestBody.banned = false;

    const sanitizedUser = {
      id: userFromRequestBody.id,
      email: userFromRequestBody.email,
      userName: userFromRequestBody.userName,
      firstName: userFromRequestBody.firstName,
      lastName: userFromRequestBody.lastName,
      role: userFromRequestBody.role,
      banned: userFromRequestBody.banned,
    };

    usersInServer.push(userFromRequestBody);

    response.status(201).json({
      status: "success",
      message: "User registered successfully.",
      data: sanitizedUser,
    });
  }
);

router.post(
  "/login",
  validateRequestBody(loginSchema),
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const foundUser = findUserByProperty(
      UserProperty.Email,
      email,
      usersInServer
    );

    if (!foundUser) {
      return response.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await comparePasswords(
      password,
      foundUser.hashedPassword
    );

    if (!passwordMatch) {
      return response.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    response.json({
      status: "success",
      message: "Login successful",
      token: generateAuthToken(foundUser),
    });
  }
);

router.post("/verify", async (request: Request, response: Response) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(400).json({
      status: "fail",
      message: "Token is required in the 'Authorization' header",
    });
  }

  const jwtToken = extractJwtToken(authorizationHeader);

  if (!jwtToken) {
    return response.status(400).json({
      status: "fail",
      message: "Invalid token format. Please use 'Bearer <token>'",
    });
  }

  try {
    const decodedToken = verifyJwtToken(jwtToken);

    if (!decodedToken) {
      return response.status(401).json({
        status: "fail",
        message: "Invalid or expired token",
      });
    }

    const userId = extractPropertyFromJwt(
      decodedToken,
      JwtProperty.UserId
    ) as string;

    const foundUser = findUserByProperty(
      UserProperty.Id,
      userId,
      usersInServer
    );

    response.status(200).json({
      status: "success",
      message: "Token is valid",
      data: foundUser,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return response.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
});

export default router;
