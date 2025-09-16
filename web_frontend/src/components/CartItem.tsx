const CartItem = () => {

    const checked = true
    const price = 200000
    const qty = 2

    return (
        <div className='w-7xl p-4 bg-white text-gray-900 dark:bg-white dark:text-gray-900 shadow-sm grid grid-cols-5 dark:border rounded-lg font-semibold text-sm mb-4'>
            <div className='flex gap-1'>
                <div
                    className={`flex items-center justify-center w-[20px] h-[20px] border text-center border-gray-300 cursor-pointer rounded-sm ${checked ? "dark:bg-gray-900 dark:text-white" : "bg-white text-transparent"}`}
                >
                    ✓
                </div>
                Sản Phẩm
            </div>
            <div className="flex gap-0.5">
                {price.toLocaleString("vi-EN")}
                <div className="underline font-thin text-xs">
                    đ
                </div>
            </div>
            <div className="grid grid-cols-3 border border-gray-300 items-center max-w-[90px]">
                <button className="cursor-pointer">-</button>
                <span className="border-l border-r border-gray-300 text-center">1</span>
                <button className="cursor-pointer">+</button>
            </div>
            <div className="flex gap-0.5">
                {(price * qty).toLocaleString("vi-EN")}
                <div className="underline font-thin text-xs">
                    đ
                </div>
            </div>
            <div className="hover:text-red-700 transition-all duration-300 hover:-translate-y-1 underline cursor-pointer">Xóa</div>
        </div>
    );
}

export default CartItem;