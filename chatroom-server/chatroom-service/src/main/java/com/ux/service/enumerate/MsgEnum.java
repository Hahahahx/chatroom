package com.ux.service.enumerate;

public enum MsgEnum {


    //
    NEW_GROUP ( "NEW_GROUP"),
    //好友申请
    NEW_NOTICE( "NEW_NOTICE"),
    //服务器发送消息（客户端接收到消息
    RECEIVE_MSG ( "RECEIVE_MSG"),
    //
    DELETE("DELETE");


    private String desc;//描述

    /**
     * 私有构造,防止被外部调用
     * @param desc
     */
    private MsgEnum(String desc){
        this.desc=desc;
    }

    /**
     * 覆盖
     * @return
     */
    @Override
    public String toString() {
        return desc;
    }

}
