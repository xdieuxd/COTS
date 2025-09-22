type Option = { value: string | number; label: string };
type Props = {
  options: Option[];
  value: string | number;
  onChange: (v: string) => void;
};
export function FilterDropdown({ options, value, onChange }: Props) {
  return (
    <section className="filter-section">
      <select
        id="filterDropdown"
        className="filter-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </section>
  );
}
