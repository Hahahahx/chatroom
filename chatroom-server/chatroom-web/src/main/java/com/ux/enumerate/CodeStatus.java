package com.ux.enumerate;



/**
 * 验证码状态枚举
 */
public enum CodeStatus {
    MISTACK("MISTACK"), //无效验证码
    NOTIME("NOTIME"),   //未到一分钟不能重发
    TIMEOUT("TIMEOUT"), //验证码超时
    ILLEGAL("ILLEGAL"), //手机号有误
    USELESS("USELESS"); //验证码是否被覆盖性失效

    private String desc;//描述

    /**
     * 私有构造,防止被外部调用
     * @param desc
     */
    private CodeStatus(String desc){
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
