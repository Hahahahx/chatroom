import  * as actionTypes  from './action-types';
import {reqGetMessageList, reqSetMessageList} from '../../../../api';


const InitialMessageList=(list) =>({
    type:actionTypes.INITIAL_TEMPORARY_LIST,
    list
});

export const InitialList =()=>{
    return async dispatch=>{
        const response = await reqGetMessageList();
        if(response.data.data)
        return dispatch(InitialMessageList(response.data.data));
    }
};

export const AddList=(data)=>{
    return async dispatch=>{
        const msg={from:data.from,group:data.group}
        console.log(msg)
        const response = await reqSetMessageList(msg);
        console.log(response);
        return dispatch(InitialMessageList(response.data.data));
    }
};
