export interface OrderData {
  id: string;
  carId: string;
  quantity: number;
  orderSum: number;
}

export interface OrderListData {
  id: string;
  orders: OrderData[];
}
