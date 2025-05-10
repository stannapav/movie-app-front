import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieSearchBar } from "../MovieSearchBar/MovieSearchBar";
import Header from '../Header/Header';
import type { Movie } from "../../Types/Movie";
import type { UserDTO } from "../../Types/UserDTO";
import "./MovieFeed.css";

export const MovieFeed = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState<number | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    navigate('/logout');
};

  const fetchMovies = async (page: number, search: string, genreId: number | null) => {
    setLoading(true);
    let url = "";
    let isSearch = false;
    if (genreId) {
      url = `http://localhost:8080/api/movies/genre/${genreId}?page=${page}&size=10`;
    } else if (search) {
      url = `http://localhost:8080/api/movies/title?title=${encodeURIComponent(search)}`;
      isSearch = true;
    } else {
      url = `http://localhost:8080/api/movies?page=${page}&size=10`;
    }
    const response = await fetch(url);
    const data = await response.json();

    if (isSearch) {
      // If the search returns a single movie object, wrap it in an array
      if (data && !Array.isArray(data)) {
        setMovies(data ? [data] : []);
        setTotalPages(1);
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } else {
      setMovies(data.content);
      setTotalPages(data.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(currentPage, search, genreId);
  }, [currentPage, search, genreId]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setCurrentPage(0);
    setGenreId(null); // Reset genre filter when searching by title
  };

  const handleGenreChange = (id: number | null) => {
    setGenreId(id);
    setCurrentPage(0);
    setSearch(""); // Reset search when filtering by genre
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <div className="movie-feed">
        <MovieSearchBar onSearch={handleSearch} onGenreChange={handleGenreChange} />
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {!search && totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};