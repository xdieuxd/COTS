export type Role = "ADMIN" | "NHAN_VIEN" | "THANH_VIEN";
export interface LoginReq {
  email: string;
  matKhau: string;
}
export interface LoginRes {
  accessToken: string;
  user: Profile;
}
export interface Profile {
  id: number;
  hoTen: string;
  email: string;
  roles: Role[];
}
