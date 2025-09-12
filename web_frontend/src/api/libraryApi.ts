import client from "./axiosClient";
export const libraryApi = {
  mine: () =>
    client.get<{
      items: Array<{
        ma_sach: number;
        ten_sach: string;
        urlPdf?: string;
        cho_phep_doc_pdf: boolean;
      }>;
    }>("/thu-vien/member/thu-vien"),
  toggleFavorite: (ma_sach: number, like: boolean) =>
    like
      ? client.post(`/thu-vien/member/yeu-thich/${ma_sach}`)
      : client.delete(`/thu-vien/member/yeu-thich/${ma_sach}`),
};
