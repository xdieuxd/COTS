import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header
      className="h-[60px] flex items-center fixed w-full bg-white text-black 
    dark:bg-gray-900 dark:text-white z-50 shadow-sm dark:shadow-lg dark:shadow-white/5 text-lg"
    >
      <div className="container mx-auto p-3 flex gap-4 items-center">
        <Link to="/">BookNest</Link>
        <Link to="/search">Tìm kiếm</Link>
        <div className="ml-auto flex gap-3 items-center">
          {user ? (
            <>
              <Link to="/library">Thư viện</Link>
              <Link to="/orders">Đơn hàng</Link>
              <Link to="/cart">Giỏ hàng</Link>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
