import {
    RETURN_USER
} from '../actions/actionTypes'

export default function(state = 0, action){
    switch(action.type){
        case RETURN_USER:
            return {
                ...state,
                logged: true,
                user: action.payload
            }
        default:
            return state
    }
}