import { put, takeLatest, delay } from 'redux-saga/effects';
import { 
    FETCH_DISCOVER, RETURN_DISCOVER,
    FETCH_KEYWORDS, RETURN_KEYWORDS } from '../../actions/actionTypes';
import { API_KEY } from '../../keys'
import axios from 'axios';

export function* fetchDiscover(action) {
    let keywords = Array.from(action.payload.keywords).map((item) => {
        return item.id
    })
    
    let genres = Array.from(action.payload.genres).map((item) => {
            return item.id
    })
    console.log(keywords)
    if(action.payload.type === 'movie') {
        const result = yield axios.get(`https://api.themoviedb.org/3/discover/${action.payload.type}?api_key=${API_KEY}&language=en-US&sort_by=${action.payload.sort}&include_adult=false&include_video=false&page=${action.payload.page}&primary_release_year=${action.payload.year}&with_keywords=${keywords}&with_genres=${genres}`)
        .then(res => res.data);
    
        yield put({type: RETURN_DISCOVER, payload: result})
    } else {
        const result = yield axios.get(`https://api.themoviedb.org/3/discover/${action.payload.type}?api_key=${API_KEY}&language=en-US&sort_by=${action.payload.sort}&include_adult=false&include_video=false&page=${action.payload.page}&first_air_date_year=${action.payload.year}&with_keywords=${keywords}`)
        .then(res => res.data);
    
        yield put({type: RETURN_DISCOVER, payload: result})
    }
    
}

export function* watchDiscover() {
    yield takeLatest(FETCH_DISCOVER, fetchDiscover)
}


export function* fetchKeywords(action) {
    if(action.payload.length){
        yield delay(800);
        const result = yield axios.get(` https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${action.payload}&page=1`)
        .then(res => res.data);
    
        yield put({type: RETURN_KEYWORDS, payload: result})
    } else {
        yield put({type: RETURN_KEYWORDS, payload: {total_results: 0}})
    }
        
    
}

export function* watchKeywords() {
    yield takeLatest(FETCH_KEYWORDS, fetchKeywords)
}