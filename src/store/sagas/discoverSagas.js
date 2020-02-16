import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_DISCOVER, RETURN_DISCOVER } from '../../actions/actionTypes';
import { API_KEY } from '../../keys'
import axios from 'axios';

export function* fetchDiscover(action) {
    if(action.payload.type === 'movie') {
        const result = yield axios.get(`https://api.themoviedb.org/3/discover/${action.payload.type}?api_key=${API_KEY}&language=en-US&sort_by=${action.payload.sort}&include_adult=false&include_video=false&page=${action.payload.page}&year=${action.payload.year}`)
        .then(res => res.data);
    
        yield put({type: RETURN_DISCOVER, payload: result})
    } else {
        const result = yield axios.get(`https://api.themoviedb.org/3/discover/${action.payload.type}?api_key=${API_KEY}&language=en-US&sort_by=${action.payload.sort}&include_adult=false&include_video=false&page=${action.payload.page}&first_air_date_year=${action.payload.year}`)
        .then(res => res.data);
    
        yield put({type: RETURN_DISCOVER, payload: result})
    }
    
}

export function* watchDiscover() {
    yield takeLatest(FETCH_DISCOVER, fetchDiscover)
}