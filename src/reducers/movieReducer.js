import {
    RETURN_MOVIES,
} from '../actions/actionTypes'

export default function(state = 0, action){
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