import {
    RETURN_PEOPLE,
} from '../actions/actionTypes'

export default function(state = 1, action){
    switch(action.type){
        case RETURN_PEOPLE:
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }
}