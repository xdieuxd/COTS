import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header
      className="h-[60px] flex items-center fixed w-full bg-white text-black 
    dark:bg-gray-900 dark:text-white z-50 shadow-sm dark:shadow-lg dark:shadow-white/5 text-lg"
    >
      <div className="w-7xl mx-auto p-3 flex gap-4 items-center">
        <Link to="/">BookNest</Link>
        <Link to="/search">Tìm kiếm</Link>
        <div className="ml-auto flex gap-3 items-center">
          {user ? (
            <div className="flex gap-4 items-center bg-gray-100 dark:bg-gray-900 px-4 rounded-lg shadow-md">
              <Link to="/library" className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors">Thư viện</Link>
              <Link to="/user/orders" className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors">Đơn hàng</Link>
              <Link to="/cart" className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors">Giỏ hàng</Link>
              <button
                onClick={logout}
                className="ml-auto px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Đăng xuất
              </button>
            </div>

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
