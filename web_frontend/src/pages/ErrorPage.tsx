import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ErrorPageProps {
    error?: {
        message?: string;
        status?: number;
        statusText?: string;
    };
}

export default function ErrorPage({ error }: ErrorPageProps) {
    useEffect(() => {
        toast.error(error?.message || "Có lỗi xảy ra!");
    }, [error]);

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
            <p className="mt-4">{error?.message || "Vui lòng thử lại hoặc quay lại trang chủ."}</p>
            <button
                onClick={() => window.location.href = "/"}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Quay lại trang chủ
            </button>
            <ToastContainer />
        </div>
    );
}
