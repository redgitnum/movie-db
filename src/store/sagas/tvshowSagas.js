import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_TVSHOWS, RETURN_TVSHOWS } from '../../actions/actionTypes';
import { API_KEY } from '../../keys'

import axios from 'axios';

export function* fetchTvshow(action) {
    const result = yield axios.get(`https://api.themoviedb.org/3/tv/${action.payload.sort}?api_key=${API_KEY}&language=en-US&page=${action.payload.page}`)
    .then(res => res.data);

    yield put({type: RETURN_TVSHOWS, payload: result})
}

export function* watchTvshow() {
    yield takeLatest(FETCH_TVSHOWS, fetchTvshow)
}