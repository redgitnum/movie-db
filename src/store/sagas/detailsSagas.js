import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_DETAILS, RETURN_DETAILS } from '../../actions/actionTypes';
import { API_KEY } from '../../keys'

import axios from 'axios';

function* getDetails(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
}

function* getCredits(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/credits?api_key=${API_KEY}`)
    .then(res => res.data);
}

export function* fetchDetails(action) {
    const details = yield* getDetails(action)
    yield put({type: RETURN_DETAILS, payload: details, category: 'entry'})

    const credits = yield* getCredits(action)
    yield put({type: RETURN_DETAILS, payload: credits, category: 'credits'})
    
}

export function* watchDetails() {
    yield takeLatest(FETCH_DETAILS, fetchDetails)
}