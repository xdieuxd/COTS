import BookCard from "./BookCard";
import type { BookCard as BookCardType } from "../types/book";

type Props = {
  books: BookCardType[];
  onClickItem?: (id: number) => void;
};

export default function BookGrid({ books, onClickItem }: Props) {
  return (
    <section className="book-grid">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onClick={() => onClickItem?.(b.id)} />
      ))}
    </section>
  );
}
