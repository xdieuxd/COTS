// Library.tsx
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    pdfUrl: string;
}

export default function Library() {

    const mockBooks: Book[] = [
        { id: "1", title: "React cơ bản", author: "Nguyễn Văn A", coverUrl: "/images/img_book_default.jpg", pdfUrl: "/pdfs/dummy.pdf" },
        { id: "2", title: "Unix Linux", author: "Trần Thị B", coverUrl: "/images/unix_linux.jpg", pdfUrl: "/pdfs/dummy.pdf" },
        { id: "3", title: "JavaScript nâng cao", author: "Lê Văn C", coverUrl: "/images/img_book_default.jpg", pdfUrl: "/pdfs/dummy.pdf" },
    ];

    const [books] = useState<Book[]>(mockBooks);

    useEffect(() => {
        document.title = "Thư viện"
        if (books.length === 0) toast.info("Bạn chưa có sách nào trong thư viện");
    }, [books]);

    if (books.length === 0) return <p className="p-5">Bạn chưa có sách nào</p>;

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="flex flex-col items-center border border-gray-400 p-2 rounded shadow bg-white dark:bg-gray-900
                       transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-900 dark:hover:bg-gray-800"
                    >
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-24 h-36 object-cover rounded"
                        />
                        <h3 className="mt-2 text-sm font-bold text-center">{book.title}</h3>
                        <a
                            href={book.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 w-full text-sm block px-2 py-1 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-center rounded"
                        >
                            Mở PDF
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
