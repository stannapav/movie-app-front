import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../../Types/Movie";
import "./MovieDetails.css";

/// <reference types="vite/client" />

export const MovieDetails = () => {
    const OMDB_KEY = process.env.VITE_OMDB_KEY;
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/movies/${id}`)
            .then(res => res.json())
            .then(setMovie);
    }, [id]);

    useEffect(() => {
        if (movie?.imdbId) {
            fetch(`http://www.omdbapi.com/?i=${movie.imdbId}&apikey=${OMDB_KEY}`)
                .then(res => res.json())
                .then(data => setImageUrl(data.Poster));
        }
    }, [movie]);

    if (!movie) return <div style={{ padding: 32 }}>Loading...</div>;

    return (
        <div className="movie-details-container">
            {imageUrl && <img src={imageUrl} alt={movie.title} className="movie-details-poster" />}
            <div className="movie-details-content">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <p><b>Release Date:</b> {movie.releaseDate}</p>
                <p><b>Rating:</b> {movie.voteAverage} ({movie.voteCount} votes)</p>
                <p><b>Genres:</b> {movie.genreNames.join(", ")}</p>
                <p><b>Production Countries:</b> {movie.productionCountryNames.join(", ")}</p>
                <p><b>Production Companies:</b> {movie.productionCompanyNames.join(", ")}</p>
                <p><b>Runtime:</b> {movie.runtime} minutes</p>
                <p><b>Original Language:</b> {movie.originalLanguage}</p>
                <p><b>Original Title:</b> {movie.originalTitle}</p>
            </div>
        </div>
    );
};