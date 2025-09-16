import { useEffect, useState } from "react";
import { catalogApi } from "@api/catalogApi";
import BookCard from "@components/BookCard";
import type { Book } from "@mytypes/book";

export default function Home() {
  const [data, setData] = useState<Book[]>([]);
  useEffect(() => {
    catalogApi.list({ trang: 1 }).then((r) => setData(r.data.items));
  }, []);
  return (
    <div className="text-2xl font-bold"> home pages</div>
  );
}
