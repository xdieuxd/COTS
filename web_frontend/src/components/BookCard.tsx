import { Link } from "react-router-dom";
import type { Book } from "@mytypes/book";

export default function BookCard({ id, tieuDe, gia, anh }: Book) {
  return (
    <div className="border p-3 rounded">
      {anh && (
        <img
          src={anh}
          alt={tieuDe}
          style={{ width: "100%", height: 180, objectFit: "cover" }}
        />
      )}
      <h3 className="mt-2 font-semibold">{tieuDe}</h3>
      <p>{gia?.toLocaleString()} đ</p>
      <Link to={`/book/${id}`}>Xem chi tiết</Link>
    </div>
  );
}
