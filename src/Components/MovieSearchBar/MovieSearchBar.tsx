import { useEffect, useState } from "react";
import type { Genre } from "../../Types/Genre";
import "./MovieSearchBar.css";

interface Props {
  onSearch: (query: string) => void;
  onGenreChange: (genreId: number | null) => void;
}

export const MovieSearchBar = ({ onSearch, onGenreChange }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | "">( "");

  useEffect(() => {
    fetch("http://localhost:8080/api/genres")
      .then(res => res.json())
      .then(setGenres);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGenre(value ? Number(value) : "");
    onGenreChange(value ? Number(value) : null);
  };

  return (
    <form onSubmit={handleSearch} className="movie-search-form">
      <input
        type="text"
        placeholder="Search movies by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="movie-search-input"
      />
      <select value={selectedGenre} onChange={handleGenreChange} className="movie-search-select">
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
      <button type="submit" className="movie-search-button">
        Search
      </button>
    </form>
  );
};
