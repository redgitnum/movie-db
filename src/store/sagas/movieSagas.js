import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_MOVIES, RETURN_MOVIES } from '../../actions/actionTypes';
import { API_KEY } from '../../keys'
import axios from 'axios';

export function* fetchMovie(action) {
    const result = yield axios.get(` https://api.themoviedb.org/3/movie/${action.payload.sort}?api_key=${API_KEY}&language=en-US&page=${action.payload.page}`)
    .then(res => res.data);

    yield put({type: RETURN_MOVIES, payload: result})
}

export function* watchMovie() {
    yield takeLatest(FETCH_MOVIES, fetchMovie)
}