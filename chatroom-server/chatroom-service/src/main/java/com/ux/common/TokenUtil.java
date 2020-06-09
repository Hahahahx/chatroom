package com.ux.common;

import static com.ux.common.MD5Util.GetMD5Code;

/**
 * Token工具类
 * */
public class TokenUtil {

    /**
     * 生成token
     * */
    public static String createToken() throws Exception {
        return MD5Util.GetMD5Code(System.currentTimeMillis()+"");
    }
}
