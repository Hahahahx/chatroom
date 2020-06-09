import * as actionTypes from './action-types'
import {reqGetUserByPhone} from "../../../../api";

const SetUser =(userDetail)=>({
    type:actionTypes.SET_USERDETAIL,
    userDetail
});

export const setUser =(phone)=>{
    return async dispatch=>{
        const response = await reqGetUserByPhone(phone);
        const user = response.data.data;
        return dispatch(SetUser(user));
    }
}