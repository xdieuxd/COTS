import { useState } from "react";
import { authApi } from "@api/authApi";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authApi.login({ email, matKhau });
    await login(res.data.accessToken);
    nav("/");
  };

  return (
    <form onSubmit={submit} className="max-w-sm space-y-3">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Mật khẩu"
        type="password"
        value={matKhau}
        onChange={(e) => setMatKhau(e.target.value)}
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
