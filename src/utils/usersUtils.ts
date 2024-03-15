import { User } from "../types/User";
import { UserProperty } from "../types/UserProperty";

export function findUserByProperty(
  property: UserProperty,
  propertyValue: User[keyof User],
  users: User[]
): User | undefined {
  return users.find((user) => {
    if (property in user) {
      return user[property] === propertyValue;
    }
    return false;
  });
}
