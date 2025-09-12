import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="border-b">
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
