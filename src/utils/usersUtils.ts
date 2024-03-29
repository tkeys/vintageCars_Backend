import generator from "generate-password";

import { UserData } from "../types/UserData";
import { UserProperty } from "../types/UserProperty";

export function findUserByProperty(
  property: UserProperty,
  propertyValue: UserData[keyof UserData],
  users: UserData[]
): UserData | undefined {
  return users.find((user) => {
    if (property in user) {
      return user[property] === propertyValue;
    }
    return false;
  });
}

export function generateNewPassword(): string {
  return generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: true,
    excludeSimilarCharacters: true,
  });
}
