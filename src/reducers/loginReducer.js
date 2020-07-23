import {
    RETURN_USER
} from '../actions/actionTypes'

export default function(state = JSON.parse(localStorage.getItem('user')) || 0, action){
    switch(action.type){
        case RETURN_USER:
            window.location.reload(false)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}