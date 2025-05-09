import type { Movie } from "../../Types/Movie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

/// <reference types="vite/client" />

interface MovieProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieProps) => {
    const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;
    const { title, imdbId, voteAverage, genreNames } = movie;
    const [imageUrl, setImageUrl] = useState<string>("");
    
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_KEY}`);
                const data = await response.json();
                setImageUrl(data.Poster);
            } catch (error) {
                console.error("Error fetching movie image:", error);
            }
        };
        fetchImage();
    }, [imdbId]);

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                {imageUrl && <img src={imageUrl} alt={title} />}
                <div className="movie-card-content">
                    <h2>{title}</h2>
                    <p>Rating: {voteAverage.toFixed(1)}</p>
                    <p>Genres: {genreNames.join(", ")}</p>
                </div>
            </div>
        </Link>
    )
};

export default MovieCard;
