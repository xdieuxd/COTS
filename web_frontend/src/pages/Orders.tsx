import { Order } from "@mytypes/order";
import { Link } from "react-router-dom";

const Orders = () => {

    const orders: Order[] = [
        {
            ma_don_hang: 101,
            name: "Lập Trình JavaScript Cơ Bản",
            status: "Đang giao",
            total_price: 250000,
            create_day: "2025-09-18",
        },
        {
            ma_don_hang: 102,
            name: "Hiểu Về Trái Tim",
            status: "Chờ xác nhận",
            total_price: 180000,
            create_day: "2025-09-17",
        },
        {
            ma_don_hang: 103,
            name: "Đắc Nhân Tâm",
            status: "Đã hủy",
            total_price: 0,
            create_day: "2025-09-16",
        },
        {
            ma_don_hang: 104,
            name: "Clean Code",
            status: "Hoàn thành",
            total_price: 520000,
            create_day: "2025-09-15",
        },
    ];



    return (
        <div className="mb-12">
            <div className="bg-white text-gray-900 p-4 rounded-lg shadow-sm">
                <h1 className="font-semibold text-lg">Đơn hàng của bạn</h1>
            </div>
            <div className="mt-3 border-b border-gray-300"></div>

            <div className="mt-4">
                {orders.map((item) => (
                    <Link
                        to={`/user/orders/${item.ma_don_hang}`}
                        state={{ order: item }}
                        key={item.ma_don_hang}
                        className="w-full block border border-gray-300 bg-white text-gray-900 p-4 mb-3 rounded-lg hover:shadow-md transition"
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">Mã đơn: {item.ma_don_hang}</span>
                            <span className="text-sm text-gray-500">{item.create_day}</span>
                        </div>
                        <div className="mt-1 text-gray-700">Sách: {item.name}</div>
                        <div className="mt-1">Trạng thái: <span className="font-semibold">{item.status}</span></div>
                        <div className="mt-2 text-orange-600 font-bold">
                            Tổng: {item.total_price.toLocaleString("vi-VN")}đ
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    );
}

export default Orders;