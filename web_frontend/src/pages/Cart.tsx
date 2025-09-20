import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CartItem from '@components/CartItem';
import CartEmpty from '@components/CartEmpty';
import ModelDeleteItemCart from '@components/ModelDeleteItemCart';
import { useState, useEffect } from 'react';
import { ItemCart } from '@mytypes/order';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
    data: ItemCart;
    deleteItem: (item: ItemCart) => void;
}
const Cart = () => {

    useEffect(() => {
        document.title = "Giỏ hàng"
    }, [])

    const navigate = useNavigate()

    const checkedAll = true
    const price = 200000
    const qty = 2

    const [itemDelete, setItemDelete] = useState<ItemCart | null>(null);

    const cartLength: number = 1
    const cart: ItemCart[] = [
        { id: 1, name: "Lập trình Java cơ bản", price: 120000, qty: 1, img: "/images/img_book_default.jpg", isChecked: true },
        { id: 2, name: "Cấu trúc dữ liệu & Giải thuật", price: 180000, qty: 2, img: "/images/img_book_default.jpg", isChecked: false },
        { id: 3, name: "Trí tuệ nhân tạo", price: 250000, qty: 1, img: "/images/img_book_default.jpg", isChecked: true },
    ];



    const confirmDelete = (item: ItemCart) => {
        setItemDelete(item);
    };
    const handleDelete = () => {
        setItemDelete(null)
    }

    const itemChecked = cart.filter(item => item.isChecked)
    const total_price = itemChecked.reduce((sum, item) => {
        return sum + item.price * item.qty;
    }, 0);

    const buy = () => {
        navigate("/checkout", { state: { items: itemChecked } });
    }

    return (
        <div className="w-full flex min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
            {cartLength === 0 ? <CartEmpty />
                : (
                    <div className='w-full mx-auto'>
                        <div className='shadow-sm mb-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
                            <div className="w-7xl mx-auto text-2xl p-8 flex items-center gap-2 ">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <h1 className="">Giỏ hàng</h1>
                                <span>(1) sản phẩm</span>
                            </div>
                        </div>

                        <div className='w-7xl mx-auto'>
                            <div className=' p-4 bg-white text-gray-900 dark:bg-white dark:text-gray-900 shadow-sm grid grid-cols-5 dark:border rounded-lg font-semibold text-sm '>
                                <div className='flex gap-1'>
                                    <div
                                        className={`flex items-center justify-center w-[20px] h-[20px] border text-center border-gray-300 cursor-pointer rounded-sm 
                                            ${checkedAll ? " bg-gray-900 text-white bg-" : "bg-white text-transparent"}`}
                                    >
                                        ✓
                                    </div>
                                    Sản Phẩm
                                </div>
                                <div>Giá</div>
                                <div>Số Lượng</div>
                                <div>Tổng Tiền</div>
                                <div>Thao tác</div>
                            </div>

                            <div className='mt-8'>
                                {cart.map((item) => (
                                    <CartItem key={item.id} data={item} deleteItem={confirmDelete} />
                                ))}

                            </div>

                            <div className='flex items-center justify-between mt-8'>
                                <div className='flex gap-2'>
                                    <div
                                        className={`flex items-center justify-center w-[20px] h-[20px] border text-center border-gray-300 cursor-pointer rounded-sm 
                                            ${checkedAll ? " bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "bg-white text-transparent"}`}
                                    >
                                        ✓
                                    </div>
                                    <span>chọn tất cả (2) sản phẩm </span>
                                    <div className='cursor-pointer transition-all duration-300 hover:underline hover:-translate-y-1'>Xóa</div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span>Thanh toán (2) sản phẩm: </span>
                                    <div className="flex gap-0.5 font-semibold text-xl">
                                        {total_price.toLocaleString("vi-EN")}
                                        <span className="underline font-thin text-xs">
                                            đ
                                        </span>
                                    </div>
                                    <button className='px-16 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-900 font-bold text-xl rounded-sm
                                                        cursor-pointer transition-all duration-300 hover:-translate-y-1
                                                    '
                                        onClick={() => buy()}
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                        {itemDelete && (
                            <ModelDeleteItemCart
                                item={itemDelete}
                                onConfirm={handleDelete}
                                onCancel={() => setItemDelete(null)}
                            />
                        )}

                    </div>
                )
            }
        </div>
    );
}

export default Cart;