type Props = {
  value: string;
  onChange: (v: string) => void;
};
export function SearchBar({ value, onChange }: Props) {
  return (
    <section className="search-section">
      <input
        type="text"
        id="searchInput"
        className="search-bar"
        placeholder="🔍 Tìm kiếm sách..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
}
