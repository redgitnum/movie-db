import { combineReducers } from 'redux';
import people from './peopleReducer';
import movies from './movieReducer';
import tvshows from './tvshowsReducer';
import discover from './discoverReducer';

export const rootReducer = combineReducers({
    people,
    movies,
    tvshows,
    discover
})