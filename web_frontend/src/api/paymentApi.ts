import client from "./axiosClient";
export const paymentApi = {
  createTxn: (ma_don: number, so_tien: number) =>
    client.post<{ txnRef: string; payUrl: string }>(
      "/thanh-toan/tao-giao-dich",
      { ma_don, so_tien }
    ),
};
