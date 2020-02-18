import {
    RETURN_KEYWORDS,
} from '../actions/actionTypes'

export default function(state = {entries: {total_results: 0}}, action){
    switch(action.type){
        case RETURN_KEYWORDS:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}