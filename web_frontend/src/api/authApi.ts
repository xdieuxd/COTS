import client from "./axiosClient";
import type { LoginReq, LoginRes, Profile } from "@mytypes/auth";

export const authApi = {
  register: (body: { hoTen: string; email: string; matKhau: string }) =>
    client.post("/xac-thuc/dang-ky", body),
  login: (body: LoginReq) => client.post<LoginRes>("/xac-thuc/dang-nhap", body),
  profile: () => client.get<Profile>("/xac-thuc/ho-so"),
  updateProfile: (body: Partial<Profile>) =>
    client.put("/xac-thuc/ho-so", body),
  forgot: (email: string) => client.post("/xac-thuc/quen-mat-khau", { email }),
  reset: (token: string, newPassword: string) =>
    client.post("/xac-thuc/dat-lai-mat-khau", { token, newPassword }),
};
