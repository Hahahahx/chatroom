package com.ux.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ux.common.JSONResponseUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@RequestMapping("/talking")
@RestController
public class TalkingController {

    @Resource
    private RedisTemplate<String,Object> redisTemplate;

    @GetMapping("/list/{phone}")
    public JSONResponseUtil getList(@PathVariable String phone, HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        Object talk = redisTemplate.opsForSet().size(userPhone+"&"+ phone);
        Object talk2 = redisTemplate.opsForSet().size(phone+"&"+userPhone);

        if(talk != null){
            return JSONResponseUtil.ok("ok",talk);
        }
        if(talk2 != null){
            return JSONResponseUtil.ok("ok",talk2);
        }
        return JSONResponseUtil.ok("null",null);
    }

    @PutMapping("/set")
    public void setList(@RequestBody String jsondata, HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        String friendPhone = mapJson.getString("phone");
        String data = mapJson.getString("data");
        Object talk = redisTemplate.opsForSet().size(phone+"&"+ friendPhone);
        Object talk2 = redisTemplate.opsForSet().size(friendPhone+"&"+phone);
        boolean flag = true;
        if(talk != null){
            flag = false;
            redisTemplate.opsForList().rightPush(phone+"&"+friendPhone,data);
        }
        if(talk2 != null){
            flag = false;
            redisTemplate.opsForList().rightPush(friendPhone+"&"+phone,data);
        }
        if(flag){
            redisTemplate.opsForList().rightPush(phone+"&"+friendPhone,data);
        }

    }

}
