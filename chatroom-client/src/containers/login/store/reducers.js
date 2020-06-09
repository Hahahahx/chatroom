import * as actionTypes from './action-types';

const initialLoginStatus = {
    loginStatus:false
}

export default function loginReducer (state = initialLoginStatus, action){
    switch (action.type) {
        case actionTypes.LOGIN_SUCEED:
            return {loginStatus:action.status,user:state.user};
        case actionTypes.LOGIN_ERROR:
            return {loginStatus:action.status};
        default:
            return state;
    }
}
