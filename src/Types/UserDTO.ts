import type { Movie } from "./Movie";

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    token: string;

    watchedMovies: Movie[];
    watchLater: Movie[];
    dropped: Movie[];
}
