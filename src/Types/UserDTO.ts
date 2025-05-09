import type { Movie } from "./Movie";

export interface UserDTO {
    id: number;
    username: string;
    email: string;

    watchedMovies: Movie[];
    watchLater: Movie[];
    dropped: Movie[];
}
