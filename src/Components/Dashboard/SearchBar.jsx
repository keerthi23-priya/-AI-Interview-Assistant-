export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search candidates..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
