import { createContext, useEffect, useState } from "react";
import { authApi } from "@api/authApi";
import type { Profile } from "@types/auth";

type AuthCtx = {
  user: Profile | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token)
      authApi
        .profile()
        .then((r) => setUser(r.data))
        .catch(() => setUser(null));
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("accessToken", token);
    const me = await authApi.profile();
    setUser(me.data);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
