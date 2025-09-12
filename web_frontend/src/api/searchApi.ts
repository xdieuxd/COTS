import client from "./axiosClient";
export const searchApi = {
  search: (q: string, trang = 1, kich_thuoc = 12) =>
    client.get<{ ids: number[]; scores: number[]; total: number }>(
      "/tim-kiem",
      {
        params: { q, trang, kich_thuoc },
      }
    ),
};
