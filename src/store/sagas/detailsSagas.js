import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_DETAILS, RETURN_DETAILS } from '../../actions/actionTypes';
import { API_KEY } from './index'

import axios from 'axios';

function* getDetails(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
}

function* getCredits(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/credits?api_key=${API_KEY}`)
    .then(res => res.data);
}

function* getReviews(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/reviews?api_key=${API_KEY}`)
    .then(res => res.data);
}

function* getImages(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/images?api_key=${API_KEY}&language=en-US&include_image_language=en`)
    .then(res => res.data);
}

function* getVideos(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/videos?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
}

function* getRecommended(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/recommendations?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
}

function* getSimilar(action) {
    return yield axios.get(` https://api.themoviedb.org/3/${action.payload.category}/${action.payload.id}/similar?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
}

function* getPlayedIn(action) {
    return yield axios.get(` https://api.themoviedb.org/3/person/${action.payload.id}/combined_credits?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data)
    .then(data => {
        let tv = (data.cast.filter(entry => entry.media_type ==='tv').sort((a,b)=> a.popularity < b.popularity).slice(0,10))
        let movies = (data.cast.filter(entry => entry.media_type ==='movie').sort((a,b)=> a.popularity < b.popularity).slice(0,10))
        return {
            'movies': movies,
            'tv': tv}
    })
}


function* fetchDetails(action) {
    const details = yield* getDetails(action)
    yield put({type: RETURN_DETAILS, payload: details, category: 'entry'})

    if(action.payload.category === 'person'){
        const playedIn = yield* getPlayedIn(action)
        yield put({type: RETURN_DETAILS, payload: playedIn, category: 'credits'})
    }
    
    else if(action.payload.category === 'movie' || action.payload.category === 'tv'){
        const credits = yield* getCredits(action)
        yield put({type: RETURN_DETAILS, payload: credits, category: 'credits'})

        const reviews = yield* getReviews(action)
        yield put({type: RETURN_DETAILS, payload: reviews, category: 'reviews'})

        const images = yield* getImages(action)
        yield put({type: RETURN_DETAILS, payload: images, category: 'images'})

        const videos = yield* getVideos(action)
        yield put({type: RETURN_DETAILS, payload: videos, category: 'videos'})

        const recommended = yield* getRecommended(action)
        yield put({type: RETURN_DETAILS, payload: recommended, category: 'recommended'})

        const similar = yield* getSimilar(action)
        yield put({type: RETURN_DETAILS, payload: similar, category: 'similar'})
    }
    
    
}

export function* watchDetails() {
    yield takeLatest(FETCH_DETAILS, fetchDetails)
}