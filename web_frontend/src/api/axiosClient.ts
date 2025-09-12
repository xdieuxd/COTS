import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(err);
  }
);

export default client;
