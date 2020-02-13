import {
    RETURN_MOVIES,
} from '../actions/actionTypes'

export default function(state = 1, action){
    switch(action.type){
        case RETURN_MOVIES:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}