import * as actionTypes from './action-types';

const initialLoginStatus = {
    hasUser:false
}

export default function registerReducer (state = initialLoginStatus, action){
    switch (action.type) {
        case actionTypes.USER_EXIST:
            return {hasUser:action.hasUser};
        case actionTypes.USER_UNEXIST:
            return {hasUser:action.hasUser};
        default:
            return state;
    }
}
