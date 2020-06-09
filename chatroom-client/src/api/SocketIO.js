import io from 'socket.io-client';
let socket;

/**
 * 用户手机号做唯一识别码连接websocket
 * @param {用户手机号} phone 
 * @param {结果回调函数} resultfn 
 */
export const connectSocketIO =(phone,resultfn)=>{
    var opts = {
        query: 'phone=' + 123
    };
    socket = io.connect('http://localhost:9099',opts);

    //连接成功
    socket.on('connect', ()=>{
        const msg = "CONNECT";
        resultfn(msg,socket);
    });
    //连接失败
    socket.on('disconnect', ()=>{
        const msg = "DISCONNECT";
        resultfn(msg,socket);
    });
}

