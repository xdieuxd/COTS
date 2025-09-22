import axiosClient from "./axiosClient";

export const catalogApi = {
  getFeatured: () => axiosClient.get("/api/catalog/home/featured"),

  getNewest: (page = 0, size = 12) =>
    axiosClient.get("/api/catalog/home/newest", { params: { page, size } }),

  getFree: (page = 0, size = 12) =>
    axiosClient.get("/api/catalog/home/free", { params: { page, size } }),
};
