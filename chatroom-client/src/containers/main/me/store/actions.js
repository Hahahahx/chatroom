 import * as actionTypes from './action-types';

export const setUser =(user)=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.SET_USER,
            user
        })
    }
}