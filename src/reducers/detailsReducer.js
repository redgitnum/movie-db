import {
    RETURN_DETAILS,
} from '../actions/actionTypes'

export default function(state = {entry: 0, credits: 0}, action){
    switch(action.type){
        case RETURN_DETAILS:
            return {
                ...state,
                [action.category]: action.payload
            }
        default:
            return state
    }
}