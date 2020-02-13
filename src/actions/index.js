import { 
    FETCH_PEOPLE,
    FETCH_MOVIES
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