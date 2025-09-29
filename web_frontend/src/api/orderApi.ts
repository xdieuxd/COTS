import client from "./axiosClient";
import type { ItemCart, Order, OrderDetail } from "@mytypes/order";

export const orderApi = {
  getCart: () => client.get<{ items: ItemCart[] }>("/don-hang/member/gio-hang"),

  addToCart: (ma_sach: number, so_luong = 1) =>
    client.post("/don-hang/member/gio-hang", { ma_sach, so_luong }),

  updateCartItem: (ma_sach: number, so_luong: number) =>
    client.put(`/don-hang/member/gio-hang/muc/${ma_sach}`, { so_luong }),

  // createOrder: (payload: { phuong_thuc_thanh_toan: "ONLINE" | "COD" }) =>
  //   client.post<{ ma_don_hang: number }>("/don-hang/member/don", payload),

  createOrder: (payload: {
    maNguoiDung: number,
    tenNguoiNhan: string;
    sdtNguoiNhan: string;
    diaChiNhan: string;
    phuongThucThanhToan: "ONLINE" | "COD";
    items: { maSach: number; soLuong: number; donGia: number }[];
    tongTien: number;
  }) =>
    client.post<{ maDonHang: number }>(
      "/api/orders",
      payload
    ),

  listOrders: () => client.get<Order[]>("/don-hang/member/don"),

  getOrder: (id: number) =>
    client.get<OrderDetail>(`/don-hang/member/don/${id}`),
};
