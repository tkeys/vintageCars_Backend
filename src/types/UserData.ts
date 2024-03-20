import { Role } from "./Role";

export interface UserData {
  id: string;
  email: string;
  userName: string;
  password?: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  role: Role;
  banned: boolean;
}
