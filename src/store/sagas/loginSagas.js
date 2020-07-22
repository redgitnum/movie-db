import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER, RETURN_USER } from '../../actions/actionTypes';
import axios from 'axios';
import qs from 'qs';


export function* fetchUser(action) {
    // const result = yield axios.post('/user/login')
    // .then(res => res.data);

    const result = yield axios.post('/user/login', qs.stringify({
        username: action.payload.username,
        password: action.payload.password
    })).then(res => {
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
    })
    .catch(error => error.response.data)
    
    yield put({type: RETURN_USER, payload: result})
}

export function* watchUser() {
    yield takeLatest(FETCH_USER, fetchUser)
}