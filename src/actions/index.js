import { 
    FETCH_PEOPLE,
    FETCH_MOVIES,
    FETCH_TVSHOWS,
    FETCH_DISCOVER,
    FETCH_KEYWORDS,
    FETCH_SEARCH,
    FETCH_DETAILS,
    RESET_STORE
} from './actionTypes';

export function fetchMovies(sort, page) {
    return {
        type: FETCH_MOVIES,
        payload: {sort, page}
    }
}

export function fetchPeople(page) {
    return {
        type: FETCH_PEOPLE,
        payload: page
    }
}

export function fetchTvshows(sort, page) {
    return {
        type: FETCH_TVSHOWS,
        payload: {sort, page}
    }
}

export function fetchDiscover(type, page, year, sort, genres, keywords) {
    return {
        type: FETCH_DISCOVER,
        payload: {
            type, 
            page, 
            year, 
            sort, 
            genres, 
            keywords
        }
    }
}

export function fetchKeywords(input) {
    return {
        type: FETCH_KEYWORDS,
        payload: input
    }
}

export function fetchSearch(query) {
    return {
        type: FETCH_SEARCH,
        payload: query
    }
}

export function fetchDetails(id, category) {
    return {
        type: FETCH_DETAILS,
        payload: {id, category}
    }
}

export function resetStore() {
    return {
        type: RESET_STORE
    }
}