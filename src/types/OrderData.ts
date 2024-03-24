export interface OrderData {
  id: string;
  userId: string;
  carId: string;
  quantity: number;
  orderSum: number;
}

export interface OrderListData {
  id: string;
  orders: OrderData[];
}
