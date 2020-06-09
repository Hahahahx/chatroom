import * as actionTypes from './action-types';
import { reqGetNotice} from "../../../../api";

const  InitialList = (list) =>({
    type:actionTypes.INITIAL_NOTICE,
    list
});



export const InitialNotice =()=>{
    return async dispatch=>{
        const response = await reqGetNotice();
        return dispatch(InitialList(response.data.data));
    }
}

export const UpdateNotice = (notice)=>{
    return async dispatch=>{
        return dispatch(InitialList(notice));
    }
}

export const EmptyNotice=()=>{
    return async dispatch=>{
        return dispatch({
            type:actionTypes.EMPTY_NOTICE
        })
    }
}

export const DeleteNotice =(id)=>{
    return async dispatch=>{
        return dispatch({
            type:actionTypes.DELETE_NOTICE,
            id
        })
    }
}