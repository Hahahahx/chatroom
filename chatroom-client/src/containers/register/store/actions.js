 import * as actionTypes from './action-types';

export const userExist =()=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.USER_EXIST,
            hasUser:true
        });
    }
}
export const userUnExist =()=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.USER_UNEXIST,
            hasUser:false
        });
    }
}


