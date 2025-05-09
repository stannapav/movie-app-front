export interface Movie {
    id: number;
    imdbId: string;
    title: string;
    overview: string;
    releaseDate: number;
    originalLanguage: string;
    originalTitle: string;
    runtime: number;
    voteAverage: number;
    voteCount: number;
    genreNames: string[];
    productionCountryNames: string[];
    productionCompanyNames: string[];
}
