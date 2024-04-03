import User from "../model/User";
import {
  comparePasswords,
  generateAuthToken,
  hashPassword,
} from "../utils/authUtils";
import { generateNewPassword } from "../utils/usersUtils";

async function recoverPassword(
  userId: string
): Promise<{ newPassword: string; token: string }> {
  const newPassword = generateNewPassword();

  const hashedPassword = await hashPassword(newPassword);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { hashedPassword: hashedPassword },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    const token = generateAuthToken(user);

    return { newPassword, token };
  } catch (error) {
    console.error("Failed to recover password:", error);
    throw new Error("Failed to recover password");
  }
}

async function changePassword(
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePasswords(
    oldPassword,
    user.hashedPassword
  );

  if (!isPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  const newPasswordHashed = await hashPassword(newPassword);

  user.hashedPassword = newPasswordHashed;
  await user.save();
}

async function banUser(userId: string, isBanned: boolean): Promise<void> {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.banned = isBanned;

    await user.save();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to ban/unban user.");
  }
}

export default {
  recoverPassword,
  changePassword,
  banUser,
};