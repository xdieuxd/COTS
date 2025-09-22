import type { BookCard as BookCardType } from "@mytypes/book";

type Props = {
  book: BookCardType;
  onClick?: () => void;
};

export default function BookCard({ book, onClick }: Props) {
  const isFree = !book.gia || Number(book.gia) === 0;

  return (
    <div className="book-item" onClick={onClick}>
      <div className="book-img-container">
        <img
          className="book-img"
          src={book.anh ?? "https://via.placeholder.com/300x400?text=No+Image"}
          alt={book.tieuDe}
        />
        <span className={`price-badge ${isFree ? "free" : "paid"}`}>
          {isFree ? "FREE" : `${Number(book.gia).toLocaleString()}đ`}
        </span>
      </div>

      <h3 className="book_title">{book.tieuDe}</h3>
    </div>
  );
}
