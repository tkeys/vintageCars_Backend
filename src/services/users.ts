import User, { UserDocument } from "../model/User";
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

export const getAllUser = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const deleteUserById = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export const updateUserById = async (
  userId: string,
  newInformation: Partial<UserDocument>
) => {
  const findUserUpdate = await User.findByIdAndUpdate(userId, newInformation, {
    new: true,
  });

  return findUserUpdate;
};

export const createNewUser = async (
  user: UserDocument
): Promise<UserDocument> => {
  return await user.save();
};
export default {
  recoverPassword,
  changePassword,
  banUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  createNewUser,
};
