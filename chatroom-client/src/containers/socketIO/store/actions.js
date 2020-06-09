import * as actionTypes from './action-types';
import io from 'socket.io-client';
let socket;


export const setSocketClient =(phone)=>{
    return async dispatch=>{
        return dispatch({
            type:actionTypes.SOCKETIO,
            phone
        })
    }
}


/**
 * 用户手机号做唯一识别码连接websocket
 * @param {用户手机号} phone 
 * @param {结果回调函数} resultfn 
*/
export const connectWS =(phone,fn)=>{
        var opts = {
            query: 'loginUserPhone=' + phone
        };
        socket = io.connect('http://localhost:9099',opts);

        
        console.log("websocket连接");
        //连接成功
        socket.on('connect',()=>{
            fn(actionTypes.CONNECT_SUCEED);
        });

        //连接失败
        socket.on('disconnect',()=>{
            fn(actionTypes.CONNECT_ERROR);
        });

        //收到消息
        socket.on(actionTypes.RECEIVE_MSG,data=>{
            fn(actionTypes.RECEIVE_MSG,data);
        })

    //收到消息
    socket.on(actionTypes.NEW_NOTICE,data=>{
        fn(actionTypes.NEW_NOTICE,data);
    })
    //收到消息
    socket.on(actionTypes.NEW_GROUP,data=>{
        fn(actionTypes.NEW_GROUP,data);
    })
    //收到消息
    socket.on(actionTypes.DELETE,data=>{
        fn(actionTypes.DELETE,data);
    })

};


export const connectSuccess=()=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.CONNECT_SUCEED,
            connectStatus:true
        })
    }
}

export const connectError=()=>{
    return dispatch=>{
        return dispatch({
            type:actionTypes.CONNECT_ERROR,
            connectStatus:false
        })
    }
}

export  const  SendMsg =(data)=>{
    return async dispatch=>{
        socket.emit(actionTypes.SEND_MSG,data)
    }
}
export  const  SendMsgGroup =(data)=>{
    return async dispatch=>{
        socket.emit(actionTypes.SEND_GROUP,data)
    }
}


