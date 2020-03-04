import {
    RETURN_DETAILS,
} from '../actions/actionTypes'

export default function(state = 0, action){
    switch(action.type){
        case RETURN_DETAILS:
            return action.payload
        default:
            return state
    }
}