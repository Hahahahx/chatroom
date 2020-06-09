 import * as actionTypes from './action-types';

export const loginSuceedAction =()=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.LOGIN_SUCEED,
            status:true
        });
    }
}
export const loginErrorAction =()=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.LOGIN_SUCEED,
            status:false
        });
    }
}
