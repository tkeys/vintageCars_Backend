import { User } from "../types/User";

export function findUserByEmail(
  users: User[],
  email: string
): User | undefined {
  return users.find((user) => user.email === email);
}
