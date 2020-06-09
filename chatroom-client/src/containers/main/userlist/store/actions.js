import * as actionTypes from './action-types'
import {
    reqAddFriend, reqDeleteFriend,
    reqGetFriendGroupList,
    reqGetFriendList,
    reqGetGroupList,
    reqGetUserByPhone
} from '../../../../api'


const InitialFriendList = (list)=>({
    type:actionTypes.INITIAL_FRIEND_LIST,
    list
})

const InitialFriendGroup =(group)=>({
    type:actionTypes.INITIAL_FRIEND_GROUP,
    group
})

export const initialFriendList =()=>{
    return async dispatch =>{
        const responceFriend = await reqGetFriendList();
        const list = responceFriend.data.data;
        return dispatch( InitialFriendList(list));
    }
};

export const initialFriendGroup =()=>{
    return async dispatch =>{
        const responceFriendGroup = await reqGetFriendGroupList();
        const group = responceFriendGroup.data.data;
        return dispatch( InitialFriendGroup(group));
    }
};

export const initialGroupList =()=>{
    return async dispatch =>{
        const responceGroup = await reqGetGroupList();
        const list = responceGroup.data.data;
        return dispatch({
            type:actionTypes.INITIAL_GROUP_LIST,
            list
        })
    }
};

export const addGroupList =(data)=>{
    return async dispatch=>{
        return dispatch({
            type:actionTypes.ADD_GROUPS,
            data
        })
    }
}

export const deleteUserList =(phone)=>{
    return dispatch=>{
        reqDeleteFriend(phone);
        dispatch(initialFriendList());
    }
}

