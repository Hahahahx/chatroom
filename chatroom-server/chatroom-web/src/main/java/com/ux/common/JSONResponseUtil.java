package com.ux.common;



/**
 * @Description: 自定义响应数据结构
 *              使用本类的方法转换成对于的数据类型格式（类，或者list）
 * 				200：表示成功
 * 				500：表示错误，错误信息在message字段中
 * 				501：bean验证错误，不管多少个错误都以map形式返回
 * 				502：拦截器拦截到用户token出错
 * 				555：异常抛出信息
 */
public class JSONResponseUtil {

    // 响应业务状态
    private Integer status;

    // 响应消息
    private String message;

    // 响应中的数据
    private Object data;


    public static JSONResponseUtil build(Integer status, String message, Object data) {
        return new JSONResponseUtil(status, message, data);
    }

    public static JSONResponseUtil ok(String message,Object data) {
        return new JSONResponseUtil(message,data);
    }

    public static JSONResponseUtil ok(String message) {
        return new JSONResponseUtil(message,null);
    }

    public static JSONResponseUtil errormessage(String message) {
        return new JSONResponseUtil(500, message, null);
    }

    public static JSONResponseUtil errorMap(Object data) {
        return new JSONResponseUtil(501, "error", data);
    }

    public static JSONResponseUtil errorTokenmessage(String message) {
        return new JSONResponseUtil(502, message, null);
    }

    public static JSONResponseUtil errorException(String message) {
        return new JSONResponseUtil(555, message, null);
    }

    public JSONResponseUtil() {
    }

    private JSONResponseUtil(String message,Object data) {
        this.status = 200;
        this.message = message;
        this.data = data;
    }

    private JSONResponseUtil(Integer status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public Boolean isOK() {
        return this.status == 200;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getmessage() {
        return message;
    }

    public void setmessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
