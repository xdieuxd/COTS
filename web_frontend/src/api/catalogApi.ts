import client from "./axiosClient";
import type { Book, BookDetail } from "@types/book";

export const catalogApi = {
  list: (params: { the_loai?: string; trang?: number; sap_xep?: string }) =>
    client.get<{ items: Book[]; total: number }>("/danh-muc/sach", { params }),
  detail: (id: number) => client.get<BookDetail>(`/danh-muc/sach/${id}`),
};
