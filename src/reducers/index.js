import { combineReducers } from 'redux';
import people from './peopleReducer';
import movies from './movieReducer'

export const rootReducer = combineReducers({
    people,
    movies
})