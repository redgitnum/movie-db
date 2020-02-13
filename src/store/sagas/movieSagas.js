import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_MOVIES, RETURN_MOVIES } from '../../actions/actionTypes';
import axios from 'axios';

export function* fetchMovie(action) {
    const result = yield axios.get(` https://api.themoviedb.org/3/movie/${action.payload.sort}?api_key=e53a6547ceb8767ac7d61c1c8dd9f879&language=en-US&page=${action.payload.page}`)
    .then(res => res.data);

    yield put({type: RETURN_MOVIES, payload: result})
}

export function* watchMovie() {
    yield takeLatest(FETCH_MOVIES, fetchMovie)
}