import User, { UserDocument } from "../model/User";
import { UserData } from "../types/UserData";
import {
  isUserNameUnique,
  isEmailAvailable,
  hashPassword,
  comparePasswords,
  generateAuthToken,
  verifyJwtToken,
  extractPropertyFromJwt,
} from "../utils/authUtils";
import { JwtProperty } from "../types/JwtProperty";
import OrderList from "../model/OrderList";
import { Role } from "../types/Role";
import { userInfo } from "os";

async function registerUser(userData: UserData) {
  if (!isUserNameUnique(userData.userName)) {
    throw new Error("Username already exists");
  }

  if (!isEmailAvailable(userData.email)) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(userData.password!);
  userData.hashedPassword = hashedPassword;

  const newOrderList = new OrderList({ orders: [] });
  await newOrderList.save();

  const orderListId = newOrderList._id;

  userData.orderHistory = [orderListId];

  const newUser = new User(userData);

  if (userData.email === "admindandan@gmail.com") {
    newUser.role = Role.Admin;
  }

  await newUser.save();

  return { newUser, token: generateAuthToken(newUser) };
}

export async function loginUser(
  email: string,
  password: string
): Promise<UserData | string | null> {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const passwordMatch = await comparePasswords(
      password,
      existingUser.hashedPassword
    );

    if (!passwordMatch) {
      return null;
    }
    console.log(existingUser);
    const token = generateAuthToken(existingUser);
    return token;
    /*  const response = {
      token: token,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      userName: existingUser.userName,
      role: existingUser.role,
      banned: existingUser.banned,
      orderHistory: existingUser.orderHistory,
      id: existingUser._id,
      hashedPassword: existingUser.hashedPassword,
    }; 

    return response; */
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Internal server error");
  }
}

export async function verifyToken(
  jwtToken: string
): Promise<UserDocument | null> {
  try {
    const decodedToken = verifyJwtToken(jwtToken);

    if (!decodedToken) {
      return null;
    }

    const userId = extractPropertyFromJwt(
      decodedToken,
      JwtProperty.UserId
    ) as string;
    const foundUser = await User.findById(userId);

    return foundUser;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token");
  }
}

export default { registerUser, loginUser, verifyToken };
