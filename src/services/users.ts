import User from "../model/User";
import { generateAuthToken, hashPassword } from "../utils/authUtils";
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

export default {
  recoverPassword,
};