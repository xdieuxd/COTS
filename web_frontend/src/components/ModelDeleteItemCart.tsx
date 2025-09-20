interface ModelDeleteItemCartProps {
    item: Item;
    onConfirm: () => void;
    onCancel: () => void;
}

const ModelDeleteItemCart: React.FC<ModelDeleteItemCartProps> = ({ item, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            {/* overlay mờ */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onCancel} // click ngoài để đóng
            ></div>

            {/* modal */}
            <div className="relative text-gray-900 bg-white p-6 rounded-xl shadow-lg w-80 z-[10]">
                <h2 className="text-lg font-semibold mb-4">Xác nhận xoá</h2>
                <div className="flex items-center gap-3">
                    <img src="" alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">Giá: {item.price.toLocaleString("vi-VN")}₫</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 bg-red-500 text-white border rounded cursor-pointer"
                    >
                        Trở lại
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-3 py-1 text-black rounded cursor-pointer"
                    >
                        Xoá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelDeleteItemCart;
