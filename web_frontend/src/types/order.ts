export interface ItemCart {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string,
  isChecked: boolean
}
export interface Order {
  ma_don_hang: number;
  name: string,
  status: string;
  total_price: number;
  create_day: string;
}
export interface OrderDetail extends Order {
  items: ItemCart[];
  paymentRef?: string;
}

export interface CheckoutData extends ItemCart { }

export interface AddressData {
  name: string;
  phone: string;
  address: string;
}

