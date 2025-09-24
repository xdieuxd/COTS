import { ItemCart } from '@mytypes/order';


interface CartItemProps {
    data: ItemCart;
    deleteItem: (item: ItemCart) => void;
}

const CartItem: React.FC<CartItemProps> = ({ data, deleteItem }) => {
    return (
        <div className="w-7xl p-4 bg-white text-gray-900 shadow-sm grid grid-cols-5 items-center border border-gray-200 rounded-lg font-semibold text-sm mb-4">
            <div className="flex gap-1 items-center">
                <div className={`flex items-center justify-center w-[20px] h-[20px] border text-center border-gray-300 cursor-pointer rounded-sm 
                                            ${data.isChecked ? " bg-gray-900 text-white bg-" : "bg-white text-transparent"}`}>
                    ✓
                </div>
                <div className="flex gap-2 items-center">
                    <img className="h-20" src={data.img} alt={data.name} />
                    <div className="flex flex-col">
                        <span className="font-bold">{data.name}</span>
                        <span>{data.price.toLocaleString("vi-EN")}đ</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-0.5">
                {data.price.toLocaleString("vi-EN")}
                <div className="underline font-thin text-xs">đ</div>
            </div>

            <div className="grid grid-cols-3 border border-gray-300 items-center max-w-[90px]">
                <button className="cursor-pointer">-</button>
                <span className="border-l border-r border-gray-300 text-center">{data.qty}</span>
                <button className="cursor-pointer">+</button>
            </div>

            <div className="flex gap-0.5">
                <div className="text-base font-bold">{(data.price * data.qty).toLocaleString("vi-EN")}</div>
                <div className="underline font-thin text-xs">đ</div>
            </div>

            <div
                className="hover:text-red-700 transition-all duration-300 hover:-translate-y-1 underline cursor-pointer"
                onClick={() => deleteItem(data)}
            >
                Xóa
            </div>
        </div>
    );
};

export default CartItem;
