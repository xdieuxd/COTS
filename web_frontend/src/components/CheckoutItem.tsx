import { CheckoutData } from "@mytypes/order";


interface CheckoutItemProps {
    data: CheckoutData;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ data }) => {



    return (
        <div className="bg-white text-gray-900 mb-2 p-6 rounded-lg shadow">

            <div className="grid grid-cols-12 items-center gap-2">
                <div className="col-span-6 flex items-center gap-2">
                    <img src={data.img} alt={data.name} className="h-16" />
                    <span>{data.name}</span>
                </div>

                <div className="col-span-2">
                    {data.price.toLocaleString("vi-VN")}đ
                </div>

                <div className="col-span-2">{data.qty}</div>

                <div className="col-span-2 font-bold">
                    {(data.price * data.qty).toLocaleString("vi-VN")}đ
                </div>
            </div>

        </div>
    );
}

export default CheckoutItem;