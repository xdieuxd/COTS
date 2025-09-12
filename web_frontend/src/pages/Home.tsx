import { useEffect, useState } from "react";
import { catalogApi } from "@api/catalogApi";
import BookCard from "@components/BookCard";
import type { Book } from "@types/book";

export default function Home() {
  const [data, setData] = useState<Book[]>([]);
  useEffect(() => {
    catalogApi.list({ trang: 1 }).then((r) => setData(r.data.items));
  }, []);
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 16,
      }}
    >
      {data.map((b) => (
        <BookCard key={b.id} {...b} />
      ))}
    </div>
  );
}
