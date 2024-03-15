import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { users } from "../data/mockUsers";
import { User } from "../types/User";
import { Role } from "../types/Role";
import {
  hashPassword,
  isEmailUnique,
  isUserNameUnique,
  validateUserInput,
} from "../utils/usersUtils";

export let usersInServer = [...users];

const router = express.Router();

router.post(
  "/",
  validateUserInput,
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
      console.log("hashedPassword", hashedPassword);
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

export default router;
