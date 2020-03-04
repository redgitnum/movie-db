import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_DETAILS, RETURN_DETAILS } from '../../actions/actionTypes';
import { API_KEY } from '../../keys'

import axios from 'axios';

export function* fetchDetails(action) {
    const result = yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);

    yield put({type: RETURN_DETAILS, payload: result})
}

export function* watchDetails() {
    yield takeLatest(FETCH_DETAILS, fetchDetails)
}