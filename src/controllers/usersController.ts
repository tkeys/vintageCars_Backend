import { Request, Response } from "express";
import userService from "../services/users";

export async function recoverPasswordHandler(
  request: Request,
  response: Response
) {
  try {
    const userId = request.params.userId;
    const { newPassword, token } = await userService.recoverPassword(userId);

    response.status(200).json({
      status: "success",
      data: {
        newPassword,
        token,
      },
      message: "Password recovered successfully",
    });
  } catch (error) {
    console.error("Error recovering password:", error);
    response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
