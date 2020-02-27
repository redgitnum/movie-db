import {
    RETURN_TVSHOWS,
} from '../actions/actionTypes'

export default function(state = 0, action){
    switch(action.type){
        case RETURN_TVSHOWS:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}