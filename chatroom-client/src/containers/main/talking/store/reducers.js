import * as actionTypes from './action-types';


const InitialList = [];

export function TalkingReducer(state=InitialList,action) {
    switch (action.type) {
        case actionTypes.INITIAL_TALKINGLIST:
            return action.data;
        case actionTypes.RECEIVE_NEWMESSAGE:
            return Receive(state,action.data);
        case actionTypes.ADD_TALKINGLIST:
            return AddMessage(state,action.phone,action.data);
        case actionTypes.SET_READ:
            return EmptyUser(state,action.phone);
        case actionTypes.EXPORT_MSG:
            return Export(state,action.phone,action.data);
        case actionTypes.SET_READ_EMPTY:
            return EmptyAll(state);
        default:
            return state;
    }
}

function EmptyAll(state) {
    let list = state;
    for(var i = 0 ; i<state.length ; i++){
        list[i].unread=0;
    }
    return [...list];
}

function EmptyUser(state,phone) {
    let list = state;
    for(var i = 0 ; i<state.length ; i++){
        if(list[i].touser === parseInt(phone)){
            list[i].unread=0;
            break;
        }
    }
    return [...list];
}

function Receive(state,data) {
    let flag = true;
    console.log(data)
    for(var i = 0 ; i<state.length ; i++){
        if(state[i].touser === parseInt(data.from)){
            state[i].talkingList.push(data);
            state[i].unread++;
            flag = false;
            break;
        }
    }
    if(flag){
        state.push({touser:parseInt(data.from),unread:1,talkingList:[data]})
    }

    return [...state];
}

function AddMessage(state,phone,data) {
    let flag = true;
    for(var i = 0 ; i<state.length ; i++){
        if(state[i].touser === parseInt(phone)){
            state[i].talkingList.push(data);
            state[i].unread=0;
            flag = false;
            break;
        }
    }
    if(flag){
        state.push({touser:phone,unread:0,talkingList:[data]})
    }
    return [...state];
}


function Export(state,phone,data) {
    let flag = true;
    for(var i = 0 ; i<state.length ; i++){
        if(state[i].touser === parseInt(phone)){
            state[i].talkingList.unshift(...data);
            flag = false;
            break;
        }
    }
    if(flag){
        state.push({touser:parseInt(phone),unread:0,talkingList:data})
    }
    return [...state];
}