package com.ux.service;

import com.ux.service.enumerate.MsgEnum;

public interface SocketIOService {

    //客户端发送消息给群组
    public static  final  String SEND_GROUP  = "SEND_GROUP";
    //客户端发送消息给其他用户
    public static  final  String SEND_MSG = "SEND_MSG";

    //启动服务
    void start() throws Exception;
    //停止服务
    void stop();

    int pushNewMessage(String phone);

    //推送用户消息
    void pushMessageToUser(MsgEnum msgEnum, String touser, Object sendMsg);

    void pushMessageToDelete(String msg,String touser);
}
