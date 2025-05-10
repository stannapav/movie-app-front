import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../../Types/Movie";
import type { UserDTO } from "../../Types/UserDTO";
import Header from '../Header/Header';
import "./MovieDetails.css";

/// <reference types="vite/client" />

enum WatchStatus {
    WATCHED = 'WATCHED',
    WATCH_LATER = 'WATCH_LATER',
    DROPPED = 'DROPPED'
}

export const MovieDetails = () => {
    const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [user, setUser] = useState<UserDTO | null>(null);
    const [watchStatus, setWatchStatus] = useState<WatchStatus | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const checkUserMovieStatus = async () => {
        if (!user || !id) return;
        
        try {
            const response = await axios.get(
                `http://localhost:8080/api/user-movies?userId=${user.id}&movieId=${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            if (response.data && typeof response.data === 'string') {
                const status = response.data.toUpperCase();
                if (Object.values(WatchStatus).includes(status as WatchStatus)) {
                    setWatchStatus(status as WatchStatus);
                }
            }
        } catch (error) {
            console.error('Error checking movie status:', error);
        }
    };

    useEffect(() => {
        if (user && id) {
            checkUserMovieStatus();
        }
    }, [user, id]);

    const handleLogout = () => {
        navigate('/logout');
    };

    const updateWatchStatus = async (status: WatchStatus) => {
        if (!user || !id) return;
        
        try {
            await axios.post(
                `http://localhost:8080/api/user-movies/${user.id}/${id}`,
                null,
                {
                    params: { status: status },
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            setWatchStatus(status);
        } catch (error) {
            console.error('Error updating watch status:', error);
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchPoster = async () => {
            if (movie?.imdbId) {
                try {
                    const response = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbId}&apikey=${OMDB_KEY}`);
                    setImageUrl(response.data.Poster);
                } catch (error) {
                    console.error('Error fetching poster:', error);
                }
            }
        };
        fetchPoster();
    }, [movie, OMDB_KEY]);

    if (!movie) return <div style={{ padding: 32 }}>Loading...</div>;

    return (
        <>
            <Header user={user} onLogout={handleLogout} />
            <div className="movie-details-container">
                {imageUrl && <img src={imageUrl} alt={movie.title} className="movie-details-poster" />}
                <div className="movie-details-content">
                    <h1>{movie.title}</h1>
                    {user && (
                        <div className="watch-status-buttons">
                            <button 
                                className={`watch-status-btn ${watchStatus === WatchStatus.WATCHED ? 'active' : ''}`}
                                onClick={() => updateWatchStatus(WatchStatus.WATCHED)}
                            >
                                Watched
                            </button>
                            <button 
                                className={`watch-status-btn ${watchStatus === WatchStatus.WATCH_LATER ? 'active' : ''}`}
                                onClick={() => updateWatchStatus(WatchStatus.WATCH_LATER)}
                            >
                                Watch Later
                            </button>
                            <button 
                                className={`watch-status-btn ${watchStatus === WatchStatus.DROPPED ? 'active' : ''}`}
                                onClick={() => updateWatchStatus(WatchStatus.DROPPED)}
                            >
                                Dropped
                            </button>
                        </div>
                    )}
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
        </>
    );
};