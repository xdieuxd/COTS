import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CartItem from '@components/CartItem';
import CartEmpty from '@components/CartEmpty';

const Cart = () => {

    const checkedAll = true
    const price = 200000
    const qty = 2

    const cartLength: number = 1

    return (
        <div className="w-full flex mt-[60px] min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
            {cartLength === 0 ? <CartEmpty />
                : (
                    <div className='w-full mx-auto'>
                        <div className='shadow-sm mb-4'>
                            <div className="w-7xl mx-auto text-2xl p-6 flex items-center gap-2 ">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <h1 className="">Giỏ hàng</h1>
                                <span>(1) sản phẩm</span>
                            </div>
                        </div>

                        <div className='w-7xl mx-auto'>
                            <div className=' p-4 bg-white text-gray-900 dark:bg-white dark:text-gray-900 shadow-sm grid grid-cols-5 dark:border rounded-lg font-semibold text-sm '>
                                <div className='flex gap-1'>
                                    <div
                                        className={`flex items-center justify-center w-[20px] h-[20px] border text-center border-gray-300 cursor-pointer rounded-sm ${checkedAll ? "dark:bg-gray-900 dark:text-white" : "bg-white text-transparent"}`}
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
                                <CartItem />
                                <CartItem />
                                <CartItem />
                            </div>

                            <div className='flex items-center justify-between mt-4'>
                                <div className='flex gap-2'>
                                    <div
                                        className={`flex items-center justify-center w-[20px] h-[20px] border text-center border-gray-300 cursor-pointer rounded-sm ${checkedAll ? "dark:bg-gray-900 dark:text-white" : "bg-white text-transparent"}`}
                                    >
                                        ✓
                                    </div>
                                    <span>chọn tất cả (2) sản phẩm </span>
                                    <div className='cursor-pointer transition-all duration-300 hover:underline hover:-translate-y-1'>Xóa</div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span>Thanh toán (2) sản phẩm: </span>
                                    <div className="flex gap-0.5">
                                        {(price * qty).toLocaleString("vi-EN")}
                                        <div className="underline font-thin text-xs">
                                            đ
                                        </div>
                                    </div>
                                    <button className='px-16 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-900 font-bold text-xl rounded-sm
                                cursor-pointer transition-all duration-300 hover:-translate-y-1
                        '>
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Cart;