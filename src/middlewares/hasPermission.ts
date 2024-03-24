import { Request, Response, NextFunction } from "express";
import { checkAuthorization } from "../utils/authUtils";
import { Role } from "../types/Role";

export async function hasPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;

  try {
    const decodedToken = checkAuthorization(req);

    if (
      decodedToken.userId === userId ||
      decodedToken.userRole === Role.Admin
    ) {
      next();
    } else {
      throw new Error("User is not authorized");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in hasPermission middleware:", error);
      res.status(403).json({
        status: "fail",
        message:
          error.message || "You are not authorized to access this resource.",
      });
    } else {
      console.error("Unknown error in hasPermission middleware:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
