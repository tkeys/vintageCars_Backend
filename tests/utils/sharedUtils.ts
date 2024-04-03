import { UserRegistrationData } from "../../src/types/UserData";
import { registerDummyUser } from "./authUtils";

export async function setupDummyUserRegistration(
  dummyUser: UserRegistrationData
) {
  const {
    token: registeredToken,
    userId: registeredUserId,
    orderListId: registeredOrderListId,
  } = await registerDummyUser(dummyUser);

  return {
    token: registeredToken,
    userId: registeredUserId,
    orderListId: registeredOrderListId,
  };
}
