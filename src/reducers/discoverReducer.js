import {
    RETURN_DISCOVER,
} from '../actions/actionTypes'

export default function(state = 0, action){
    switch(action.type){
        case RETURN_DISCOVER:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}