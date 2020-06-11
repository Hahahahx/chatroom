package com.ux.api;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;


/**
 * 阿里巴巴短信发送api
 * @author ux
 * @date 19.09.07
 * */

public class SendSmsApi {

    public static String sendsms(String phone, String code) {
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "/*参数*/", "/*参数*/");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("SignName", "在线聊天系统");
        request.putQueryParameter("TemplateCode", "SMS_173765183");
        request.putQueryParameter("PhoneNumbers", phone);               //手机号
        request.putQueryParameter("TemplateParam", "{\"code\":\""+code+"\"}");      //验证码
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
            return response.getData();
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
        return null;
    }

}
