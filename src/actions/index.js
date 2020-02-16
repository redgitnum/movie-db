import { 
    FETCH_PEOPLE,
    FETCH_MOVIES,
    FETCH_TVSHOWS,
    FETCH_DISCOVER
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