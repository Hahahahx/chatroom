package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.ux.api.SendSmsApi;
import com.ux.common.JSONResponseUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

@RequestMapping("/sendsms")
@RestController
public class SendSMSController {

    @Resource
    private RedisTemplate<String,Object> redisTemplate;



    @PostMapping
    @ResponseBody
    public JSONResponseUtil sendSms(@RequestBody String jsondata){
        String phone = JSONObject.parseObject(jsondata).getString("phone");
        Object lastTime = redisTemplate.opsForHash().get("lastSendTime",phone);
        long currentTime = new Date().getTime()/1000;
        long code =  Math.round(Math.random() * (999999-100000) +100000);   //六位随机数
        if(lastTime != null){
            int i =(int)lastTime - (int)currentTime;
            System.out.println(i+"s时间差");
            if(i+60>0){
                return JSONResponseUtil.errormessage("请于"+i+"s后再重试");
            }
        }

        Object lastCode = redisTemplate.opsForList().leftPop(phone);
        if(lastCode != null){
            while (lastCode.equals(code)){
                code =  Math.round(Math.random() * (999999-100000) +100000);   //六位随机数
            }
        }

        String response = SendSmsApi.sendsms(phone,code+"");
        JSONObject jsonObject = JSONObject.parseObject(response);
        if(jsonObject.getString("Code").equals("isv.MOBILE_NUMBER_ILLEGAL")) {
            return JSONResponseUtil.errormessage("无效手机号");
        }

        redisTemplate.opsForHash().put("lastSendTime",phone,currentTime);
        redisTemplate.opsForValue().set(phone,code);
        return JSONResponseUtil.ok("发送成功");
    }
}
