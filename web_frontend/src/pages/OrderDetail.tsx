import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useParams } from "react-router-dom";
import { Order } from "@mytypes/order";

const OrderDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { order } = location.state as { order: Order };

    return (
        <div className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <Link to="/user/orders" className="p-2 hover:text-orange-500">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <span className="font-semibold">Trạng thái: {order.status}</span>
            </div>

            <div className="border-t border-gray-300 pt-4">
                <h2 className="text-lg font-bold mb-3">Thông tin đơn hàng #{id}</h2>

                <div className="flex items-center gap-4 mb-4">
                    <img
                        src="/images/img_book_default.jpg"
                        alt={order.name}
                        className="w-24 h-32 object-cover border rounded"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-lg">{order.name}</span>
                        <span className="text-lg text-gray-600">
                            Ngày mua: {order.create_day}
                        </span>
                        <span className="text-lg">
                            Trạng thái: <b>{order.status}</b>
                        </span>
                    </div>
                </div>

                <div className="mt-2 font-semibold text-orange-600">
                    Tổng tiền: {order.total_price.toLocaleString("vi-VN")}đ
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
