import { connectToTestDatabase, closeTestDatabase } from "../db-helper";
import orderListServices from "../../src/services/orderList";
import { setupDummyUserRegistration } from "../utils/sharedUtils";
import { dummyDaniloUserData } from "../utils/authUtils";

let orderListId: string;

beforeAll(async () => {
  await connectToTestDatabase();

  const { orderListId: registeredOrderListId } =
    await setupDummyUserRegistration(dummyDaniloUserData);
  orderListId = registeredOrderListId;
});

afterAll(async () => {
  await closeTestDatabase();
});

describe("OrderList Services", () => {
  it("should add an order to the order list", async () => {
    const addedOrder = await orderListServices.addOrderToOrderList(
      orderListId,
      {
        carId: "65f80a3370ee734ea399ae01",
        quantity: 2,
        orderSum: 80000,
        id: "",
      }
    );

    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.carId.toString()).toBe("65f80a3370ee734ea399ae01");
    expect(addedOrder.quantity).toBe(2);
    expect(addedOrder.orderSum).toBe(80000);
  });
});
