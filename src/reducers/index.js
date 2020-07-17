import { combineReducers } from 'redux';
import people from './peopleReducer';
import movies from './movieReducer';
import tvshows from './tvshowsReducer';
import discover from './discoverReducer';
import keywords from './keywordsReducer';
import search from './searchReducer';
import details from './detailsReducer';
import user from './loginReducer';

const appReducer = combineReducers({
    people,
    movies,
    tvshows,
    discover,
    keywords,
    search,
    details,
    user
})

export const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
      let userData = state.user;
      state = undefined;
      return {
        ...state, 
        user: userData
      }
    }
  
    return appReducer(state, action);
  };
  
  export default rootReducer;