import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { User } from "../types/User";
import userSchema from "../validators/userSchema";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error hashing password: " + error.message);
    } else {
      throw new Error("Unknown error occurred while hashing password.");
    }
  }
}

export function isUserNameUnique(userName: string, users: User[]): boolean {
  return !users.some((user) => user.userName === userName);
}

export function isEmailUnique(email: string, users: User[]): boolean {
  return !users.some((user) => user.email === email);
}

export function validateUserInput(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { error } = userSchema.validate(request.body);
  if (error) {
    return response.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  next();
}
