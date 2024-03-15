import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../types/User";
import { JwtProperty } from "../types/JwtProperty";
import { DecodedJwtPayload } from "../types/DecodedJwtPayload";

const saltRounds = 10;
const secret = crypto.randomBytes(32).toString("hex");

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

export function validateRequestBody(schema: Joi.ObjectSchema) {
  return function (request: Request, response: Response, next: NextFunction) {
    const { error } = schema.validate(request.body);
    if (error) {
      return response.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    next();
  };
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateAuthToken(user: User): string {
  const token = jwt.sign(
    { userId: user.id, userRole: user.role, isUserBanned: user.banned },
    secret,
    {
      expiresIn: "24h",
    }
  );
  return token;
}

export function extractJwtToken(authorizationHeader: string): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const tokenParts = authorizationHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return null;
  }

  return tokenParts[1];
}

export function verifyJwtToken(jwtToken: string): DecodedJwtPayload | null {
  try {
    const decodedToken = jwt.verify(jwtToken, secret);
    return decodedToken as DecodedJwtPayload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export function extractPropertyFromJwt<T extends DecodedJwtPayload>(
  decodedToken: T,
  property: JwtProperty
): DecodedJwtPayload[keyof DecodedJwtPayload] | undefined {
  return decodedToken[property];
}

