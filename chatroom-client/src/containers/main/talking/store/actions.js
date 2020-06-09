import * as actionTypes from './action-types';

const InitialList =(data)=>({
    type:actionTypes.INITIAL_TALKINGLIST,
    data
});

export const receiveMessage =(data)=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.RECEIVE_NEWMESSAGE,
            data
        })
    }
}

export  const addMyMesageToList=(phone,data)=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.ADD_TALKINGLIST,
            phone,
            data
        })
    }
}

export const SetRead=(phone)=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.SET_READ,
            phone
        })
    }
}

export const exportFile=(phone,data)=>{
    console.log(data)
    return dispatch=>{
        dispatch({
            type:actionTypes.EXPORT_MSG,
            phone,
            data
        })
    }
}

export const SetEmpty=()=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.SET_READ_EMPTY,
        })
    }
}