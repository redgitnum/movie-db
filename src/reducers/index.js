import { combineReducers } from 'redux';
import people from './peopleReducer';
import movies from './movieReducer';
import tvshows from './tvshowsReducer';
import discover from './discoverReducer';
import keywords from './keywordsReducer';
import search from './searchReducer';
import details from './detailsReducer';

const appReducer = combineReducers({
    people,
    movies,
    tvshows,
    discover,
    keywords,
    search,
    details
})

export const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
      state = undefined;
    }
  
    return appReducer(state, action);
  };
  
  export default rootReducer;