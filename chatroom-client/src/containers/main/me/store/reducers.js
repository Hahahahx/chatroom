import * as actionTypes from './action-types';

const initialUser = {
}

export default function userReducer (state = initialUser, action){
    switch (action.type) {
        case actionTypes.SET_USER:
            return action.user
        default:
            return state;
    }
}
