import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_SEARCH, RETURN_SEARCH } from '../../actions/actionTypes';
import { API_KEY } from './index'
import axios from 'axios';

function* searchMovies(action) {
    return yield axios.get(` https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${action.payload}&page=1&include_adult=false`)
    .then(res => res.data);
}

function* searchTv(action) {
    return yield axios.get(` https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${action.payload}&page=1&include_adult=false`)
    .then(res => res.data);
}

function* searchPerson(action) {
    return yield axios.get(` https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${action.payload}&page=1&include_adult=false`)
    .then(res => res.data);
}

export function* fetchSearch(action) {
    const movies = yield* searchMovies(action)
    yield put({type: RETURN_SEARCH, payload: movies, category: 'movies'})

    const tv = yield* searchTv(action)
    yield put({type: RETURN_SEARCH, payload: tv, category: 'tv'})

    const people = yield* searchPerson(action)
    yield put({type: RETURN_SEARCH, payload: people, category: 'people'})
}

export function* watchSearch() {
    yield takeLatest(FETCH_SEARCH, fetchSearch)
}