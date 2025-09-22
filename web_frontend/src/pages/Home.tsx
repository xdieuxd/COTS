import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookGrid from "../components/BookGrid";
import { SearchBar } from "../components/SearchBar";
import { FilterDropdown } from "../components/FilterDropdown";
import { catalogApi } from "../api/catalogApi";
import type { BookCard } from "../types/book";
import "../styles/trangchu.css";
import { useNavigate } from "react-router-dom";

type Category = { id: number; name: string };

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [catId, setCatId] = useState<string>("all");

  const [featured, setFeatured] = useState<BookCard[]>([]);
  const [freeBooks, setFreeBooks] = useState<BookCard[]>([]);
  const [newestBooks, setNewestBooks] = useState<BookCard[]>([]);

  const [cats, setCats] = useState<Category[]>([]);

  // gọi API
  useEffect(() => {
    (async () => {
      const [f, free, newest] = await Promise.all([
        catalogApi.getFeatured(),
        catalogApi.getFree(0, 14),
        catalogApi.getNewest(0, 14),
      ]);
      setFeatured(f.data);
      setFreeBooks(free.data.content);
      setNewestBooks(newest.data.content);
    })();
  }, []);

  useEffect(() => {
    setCats([{ id: 0, name: "Tất cả thể loại" }]);
  }, []);

  const filteredFeatured = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return featured.filter((b) => {
      const okQ = !keyword || (b.tieuDe ?? "").toLowerCase().includes(keyword);
      const okCat = catId === "all" || true;
      return okQ && okCat;
    });
  }, [featured, q, catId]);

  const goDetail = (id: number) => navigate(`/books/${id}`);

  return (
    <>
      <Header />

      {/* Search */}
      <SearchBar value={q} onChange={setQ} />

      {/* Filter */}
      <FilterDropdown
        value={catId}
        onChange={setCatId}
        options={[
          { value: "all", label: "Tất cả thể loại" },
          ...cats.map((c) => ({ value: String(c.id), label: c.name })),
        ]}
      />

      {/* bookGrid chính */}
      <section className="book-grid" id="bookGrid">
        <BookGrid books={filteredFeatured} onClickItem={goDetail} />
      </section>

      {/* Sách miễn phí */}
      <section className="book-section">
        <h2>Sách miễn phí</h2>
        <div className="book-grid" id="freeBooks">
          <BookGrid books={freeBooks} onClickItem={goDetail} />
        </div>
      </section>

      {/* Sách mới nhất */}
      <section className="book-section">
        <h2>Sách mới nhất</h2>
        <div className="book-grid" id="newestBooks">
          <BookGrid books={newestBooks} onClickItem={goDetail} />
        </div>
      </section>

      <Footer />
    </>
  );
}
