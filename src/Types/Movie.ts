export interface Movie {
    id: number;
    imdbId: string;
    title: string;
    overview: string;
    releaseDate: string;
    originalLanguage: string;
    originalTitle: string;
    runtime: number;
    voteAverage: number;
    voteCount: number;

    genreNames: string[];
    productionCountryNames: string[];
    productionCompanyNames: string[];
}

export interface PageableResponse {
    content: Movie[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
