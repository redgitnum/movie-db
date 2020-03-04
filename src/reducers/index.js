import { combineReducers } from 'redux';
import people from './peopleReducer';
import movies from './movieReducer';
import tvshows from './tvshowsReducer';
import discover from './discoverReducer';
import keywords from './keywordsReducer';
import search from './searchReducer';
import details from './detailsReducer';

export const rootReducer = combineReducers({
    people,
    movies,
    tvshows,
    discover,
    keywords,
    search,
    details
})