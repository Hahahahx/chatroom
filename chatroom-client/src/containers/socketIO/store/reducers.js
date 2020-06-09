import * as actionTypes from './action-types';

const initialClientState = {
    phone:null,
}
const initialConnectState = {
    connectStatus:false,
}

/**
 * socket减速器 在状态中添加socket连接变量
 */
export function reducerSocket(state = initialClientState,action){
    switch (action.type){
        case actionTypes.SOCKETIO:
            return {phone: action.phone};
        default:
            return state;
    }
}

/**
 * connect减速器 在状态中添加连接成功失败状态
 */
export function reducerConnect(state = initialConnectState,action){
    switch (action.type){
        case actionTypes.CONNECT_SUCEED:
            return {connectStatus: action.connectStatus};
        case actionTypes.CONNECT_ERROR:
            return {connectStatus: action.connectStatus};
        default:
            return state;
    }
}
const initialLastMessageState ={

}
export function lastMessageReducer(state = initialLastMessageState,action) {

}