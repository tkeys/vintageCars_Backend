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

export async function changePasswordHandler(req: Request, res: Response) {
  const { email, oldPassword, newPassword } = req.body;

  try {
    await userService.changePassword(email, oldPassword, newPassword);
    res
      .status(200)
      .json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error while changing password" });
  }
}

export async function banUserHandler(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const isBanned = req.body.banned;

    if (typeof isBanned !== "boolean") {
      res.status(400).json({
        status: "error",
        message: 'Invalid input. "banned" field must be a boolean',
      });
      return;
    }

    await userService.banUser(userId, isBanned);
    res.status(200).json({
      status: "success",
      message: `User ${userId} ${
        isBanned ? "banned" : "unbanned"
      } successfully.`,
    });
  } catch (error) {
    console.error("Error banning/unbanning user:", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
}