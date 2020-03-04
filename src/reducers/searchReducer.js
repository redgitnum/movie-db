import {
    RETURN_SEARCH,
} from '../actions/actionTypes'

export default function(state = 0, action){
    switch(action.type){
        case RETURN_SEARCH:
            return {
                ...state,
                [action.category]: action.payload
            }
        default:
            return state
    }
}