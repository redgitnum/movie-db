import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_PEOPLE, RETURN_PEOPLE } from '../../actions/actionTypes';
import axios from 'axios';

export function* fetchPeople(action) {
    const result = yield axios.get(`https://api.themoviedb.org/3/person/popular?api_key=e53a6547ceb8767ac7d61c1c8dd9f879&language=en-US&page=${action.payload}`)
    .then(res => res.data);

    yield put({type: RETURN_PEOPLE, payload: result})
}

export function* watchPeople() {
    yield takeLatest(FETCH_PEOPLE, fetchPeople)
}