package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.ux.common.JSONResponseUtil;
import com.ux.common.TokenUtil;
import com.ux.enumerate.CodeStatus;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.service.UserService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;


@RequestMapping("/login/")
@RestController
public class LoginController {

    @Resource
    private RedisTemplate<String,Object> redisTemplate;
    @Resource
    UserService userService;

    private CodeStatus codeStatus;

    /**
     * 验证验证码并登录或注册
     *
     * @return*/
    @PostMapping("verification")
    public JSONResponseUtil loginWithVerify(@RequestBody String jsondata, HttpSession session) throws Exception {
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        String phone = mapJson.getString("phone");
        String userCode =mapJson.getString("verification");
        Object lastCode = redisTemplate.opsForValue().get(phone);

        if(Objects.isNull(lastCode)){
            return JSONResponseUtil.errormessage("该手机未申请验证码");
        }

        if(lastCode.toString().equals(userCode)){
            redisTemplate.delete(phone);
            ChatroomUser user = userService.getUserByPhone(phone);
            if(user != null){
                session.setAttribute("chatroom_phone",phone);

                if(user.getUserPassword()==null){
                    Map<String, Boolean> result = new HashMap<>();
                    result.put("hasUser",false);
                    return JSONResponseUtil.ok("成功",result);
                }
                user.setUserPassword(null);
                Map<String, Object> result = new HashMap<>();
                result.put("hasUser",true);
                result.put("user",user);
                return JSONResponseUtil.ok("成功",result);
            }else {
                userService.createUser(phone);
                session.setAttribute("chatroom_phone",phone);
                Map<String, Boolean> result = new HashMap<>();
                result.put("hasUser",false);
                return JSONResponseUtil.ok("成功",result);
            }
        }else {
            return JSONResponseUtil.errormessage("错误验证码");
        }
    }


    /**
     * 密码登录
     *
     * @return*/
    @PostMapping("password")
    public JSONResponseUtil loginWithPwd(@RequestBody String jsondata, HttpSession session) throws Exception {
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        String password = mapJson.getString("password");
        String phone = mapJson.getString("phone");

        ChatroomUser user = userService.getUserByPhone(phone);
        if(user != null){
            if(user.getUserPassword().equals(password)){
                user.setUserPassword(null);
                session.setAttribute("chatroom_phone",phone);
                Map<String, Object> result = new HashMap<>();
                result.put("hasUser",true);
                result.put("user",user);
                return JSONResponseUtil.ok("成功",result);
            }else{
                return JSONResponseUtil.errormessage("密码不对");
            }
        }else {
            return JSONResponseUtil.errormessage("账号不对");
        }
    }
}
