import { dummyDaniloUserData, registerDummyUser } from "./authUtils";

export async function setupDummyUserRegistration() {
  const {
    token: registeredToken,
    userId: registeredUserId,
    orderListId: registeredOrderListId,
  } = await registerDummyUser(dummyDaniloUserData);

  return {
    token: registeredToken,
    userId: registeredUserId,
    orderListId: registeredOrderListId,
  };
}
