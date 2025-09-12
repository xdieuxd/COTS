export interface CartItem {
  ma_sach: number;
  ten_sach: string;
  so_luong: number;
  don_gia: number;
}
export interface Order {
  ma_don_hang: number;
  trang_thai: string;
  tong_tien: number;
  ngay_tao: string;
}
export interface OrderDetail extends Order {
  items: CartItem[];
  paymentRef?: string;
}
