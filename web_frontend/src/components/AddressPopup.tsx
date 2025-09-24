import { useState, useEffect } from "react";
import { AddressData } from "@mytypes/order";

type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

interface AddressPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: AddressData) => void;
}

const AddressPopup: React.FC<AddressPopupProps> = ({ isOpen, onClose, onSave }) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [street, setStreet] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // load tỉnh
    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then((res) => res.json())
            .then((data: Province[]) => setProvinces(data));
    }, []);

    // load quận
    useEffect(() => {
        if (!selectedProvince) return;
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
            .then((res) => res.json())
            .then((data) => setDistricts(data.districts as District[]));

        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
    }, [selectedProvince]);

    // load xã
    useEffect(() => {
        if (!selectedDistrict) return;
        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
            .then((res) => res.json())
            .then((data) => setWards(data.wards as Ward[]));

        setSelectedWard("");
    }, [selectedDistrict]);

    if (!isOpen) return null;

    const handleSave = () => {
        const fullAddress = [
            street,
            wards.find((w) => w.code.toString() === selectedWard)?.name,
            districts.find((d) => d.code.toString() === selectedDistrict)?.name,
            provinces.find((p) => p.code.toString() === selectedProvince)?.name,
        ]
            .filter(Boolean)
            .join(", ");

        const newData: AddressData = { name, phone, address: fullAddress };

        onSave(newData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-gray-900">
            <div className="bg-white rounded-lg shadow-lg w-[500px]">
                {/* header */}
                <div className="flex justify-between items-center border-b px-5 py-3">
                    <h2 className="text-lg font-semibold">Địa chỉ mới</h2>
                    <button onClick={onClose} className="text-xl font-bold hover:opacity-70">
                        ×
                    </button>
                </div>

                {/* body */}
                <div className="p-5 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border rounded-md p-2 w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="">Tỉnh/Thành phố</option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!districts.length}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="">Quận/Huyện</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            disabled={!wards.length}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="">Phường/Xã</option>
                            {wards.map((w) => (
                                <option key={w.code} value={w.code}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="text"
                        placeholder="Địa chỉ cụ thể"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* footer */}
                <div className="flex justify-end space-x-2 border-t px-5 py-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Trở lại
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        Hoàn thành
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressPopup;
