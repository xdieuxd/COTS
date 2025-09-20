import { useLocation } from "react-router-dom";
import { CheckoutData } from "@mytypes/order";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CheckoutItem from "@components/CheckoutItem";
import { useEffect, useState } from "react";

const Checkout = () => {

    useEffect(() => {
        document.title = "Thanh toán"
    }, [])
    const { state } = useLocation();
    const { items = [] } = (state as { items: CheckoutData[] }) || {};

    const [method, setMethod] = useState<"cod" | "bank">("bank");
    const total_price = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="w-full flex min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
            <div className="w-full mx-auto">
                <div className="shadow-sm dark:shadow-none mb-4 bg-white dark:bg-gray-900 dark:text-white">
                    <div className="w-7xl mx-auto text-2xl p-8 flex items-center gap-2">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <h1>Thanh toán</h1>
                        <span>({items.length}) sản phẩm</span>
                    </div>
                </div>

                <div className="w-7xl mx-auto">
                    <div className="p-4 rounded-lg bg-white text-gray-900 shadow">
                        <div className="text-xl font-bold flex items-center gap-2">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>Địa chỉ nhận hàng</span>
                        </div>
                        <div className="flex mt-4 items-center gap-4">
                            <div className="flex gap-2 font-bold text-lg">
                                <span>Nguyễn Đắc Hải</span>
                                <span>0123456789</span>
                            </div>
                            <span className="text-lg">77 Mai Xuân Thưởng, Phường Hòa Khê, Quận Thanh Khê, Đà Nẵng</span>
                        </div>
                    </div>

                    <div className="mt-6 bg-white text-gray-900 mb-2 p-4 rounded-lg shadow">
                        <div className="grid grid-cols-12 items-center gap-2">
                            <div className="col-span-6 flex items-center gap-2"><span>Sản phẩm</span></div>
                            <div className="col-span-2">Đơn giá</div>
                            <div className="col-span-2">Số lượng</div>
                            <div className="col-span-2">Thành tiền</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        {items.map(item => <CheckoutItem key={item.id} data={item} />)}
                    </div>

                    <div className="bg-white text-gray-900 p-4 mb-12">
                        <div className="flex gap-2">
                            <span className="text-xl">Chọn phương thức thanh toán: </span>
                            <div className="flex gap-4">
                                <button onClick={() => setMethod("bank")} className={`border rounded py-1 px-4 transition ${method === "bank" ? "border-orange-500 text-orange-600" : "border-gray-300"}`}>Ngân hàng</button>
                                <button onClick={() => setMethod("cod")} className={`border rounded py-1 px-4 transition ${method === "cod" ? "border-orange-500 text-orange-600" : "border-gray-300"}`}>Thanh toán khi nhận hàng</button>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 my-4">
                            {method === "bank" ? (
                                <img className="h-40" src="/images/qr.jpg" alt="ma_tai_khoang" />
                            ) : (
                                <div className="mt-6 flex gap-6">
                                    <span>Thanh toán khi nhận hàng: </span>
                                    <span>Phí thu hộ 0đ</span>
                                </div>
                            )}
                        </div>

                        <div className="w-full mt-6 pt-4">
                            <div className="flex justify-end text-sm text-gray-900 space-y-2 flex-col items-end">
                                <div className="flex justify-between w-64"><span>Tổng tiền hàng</span><span>{total_price.toLocaleString("vi-VN")}đ</span></div>
                                <div className="flex justify-between w-64 font-bold text-lg text-orange-600"><span>Tổng thanh toán</span><span>{total_price.toLocaleString("vi-VN")}đ</span></div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="bg-gray-900 text-white transition-all duration-300 hover:-translate-y-1 font-semibold py-2 px-12 rounded-sm cursor-pointer">Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
