import * as actionTypes from './action-types';


const initialFriendGroupList =[
]

export function friendGroupListReducer (state=initialFriendGroupList,action){
    switch(action.type){
        case(actionTypes.INITIAL_FRIEND_GROUP):
            return action.group;
        default:
            return state;
    }
}

const initialFriendList =[
]

export function friendListReducer (state=initialFriendList,action){
    switch(action.type){
        case(actionTypes.INITIAL_FRIEND_LIST):
            return action.list;
        case actionTypes.ADD_USERS:
            return [action.user,...state];
        case actionTypes.DELETE_USERS:
            state = state.filter(item=>item.userPhone!==action.phone);
            return [...state];
        default:
            return state;
    }
}


const initialGroupList =[
]

export function groupListReducer (state=initialGroupList,action){
    switch(action.type){
        case(actionTypes.INITIAL_GROUP_LIST):
            return action.list;
        case actionTypes.ADD_GROUPS:
            return [action.group,...state];
        default:
            return state;
    }
}

