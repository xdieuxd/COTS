import { useState } from "react";
import AddressPopup from "@components/AddressPopup";

interface User {
    username: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
}

const Profile = () => {
    const fields = [
        { label: "Tên đăng nhập", key: "username" },
        { label: "Tên", key: "name" },
        { label: "Email", key: "email" },
        { label: "Số điện thoại", key: "phone" },
    ];

    const [user, setUser] = useState<User>({
        username: "haine@gmail.com",
        name: "Nguyễn Đắc Hải",
        email: "haine@gmail.com",
        phone: "0123456789",
        address: "77 Mai Xuân Thưởng, Phường Hòa Khê, Quận Thanh Khê, Đà Nẵng",
        avatar: "",
    });

    const [showAddressPopup, setShowAddressPopup] = useState(false);

    return (
        <div className="px-4 border border-gray-300 bg-white text-gray-900 shadow-sm rounded">
            <div className="p-3 font-semibold border-b border-gray-300">
                <h1 className="text-lg font-medium">Hồ sơ của tôi</h1>
                <h2 className="text-sm font-light">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </h2>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-3">
                {/* Form bên trái */}
                <div className="flex items-start flex-col border-r col-span-8 border-gray-300 w-full">
                    {fields.map((field) => (
                        <div
                            className="flex items-center gap-2 mb-4 w-full"
                            key={field.key}
                        >
                            <span className="w-32 text-gray-400">{field.label}</span>
                            <input
                                className="flex-1 border border-gray-300 rounded-sm outline-0 p-2"
                                value={user[field.key as keyof User]}
                                onChange={(e) =>
                                    setUser({ ...user, [field.key]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    {/* Địa chỉ */}
                    <div className="flex items-center gap-2 mb-2 w-full">
                        <span className="w-32 text-gray-400">Địa chỉ</span>
                        <input
                            className="flex-1 border border-gray-300 rounded-sm outline-0 p-2"
                            value={user.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                        />
                    </div>
                    <button
                        type="button"
                        className="ml-32 mb-4 px-3 py-2 bg-gray-900 text-white rounded hover:-translate-y-1 transition-all duration-300"
                        onClick={() => setShowAddressPopup(true)}
                    >
                        Thêm địa chỉ
                    </button>

                    <button className="w-20 mb-4 px-6 py-2 border rounded bg-gray-900 text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        Lưu
                    </button>
                </div>

                {/* Avatar bên phải */}
                <div className="col-span-4 flex items-center justify-center flex-col">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                        <img
                            src={user.avatar || "/default-avatar.png"}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <input
                        id="avatar-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setUser({
                                    ...user,
                                    avatar: URL.createObjectURL(file),
                                });
                            }
                        }}
                    />
                    <label
                        htmlFor="avatar-upload"
                        className="mt-2 px-3 py-1 bg-gray-900 text-white rounded cursor-pointer transition-all duration-300 hover:-translate-y-1"
                    >
                        Chọn ảnh
                    </label>
                </div>
            </div>

            {/* Popup chọn địa chỉ */}
            {showAddressPopup && (
                <AddressPopup
                    isOpen={showAddressPopup}
                    onClose={() => setShowAddressPopup(false)}
                    onSave={(data) => {
                        setUser({
                            ...user,
                            name: data.name,
                            phone: data.phone,
                            address: data.address,
                        });
                        setShowAddressPopup(false);
                    }}
                />
            )}
        </div>
    );
};

export default Profile;
