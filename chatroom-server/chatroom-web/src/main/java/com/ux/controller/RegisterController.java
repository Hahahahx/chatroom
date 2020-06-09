package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.service.UserService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("/register")
@RestController
public class RegisterController {


    @Resource
    private RedisTemplate<String, Object> redisTemplate;
    @Resource
    UserService userService;

    /**
     * 创建用户
     */
    @PutMapping
    public JSONResponseUtil registerUser(@RequestBody String jsondata, HttpSession session) throws Exception {
        JSONObject mapJson = JSONObject.parseObject(jsondata);
        Object phone = session.getAttribute("chatroom_phone");

        if (phone == null) {
            return JSONResponseUtil.errormessage("断开连接，重新登录");
        }

            List<String> address = mapJson.getObject("residence",new TypeReference<List<String>>(){});
            int id = userService.getUserByPhone(phone.toString()).getUserId();
            ChatroomUser user = new ChatroomUser();
            user.setUserId(id)
                    .setUserPassword(mapJson.getString("password"))
                    .setUserNickname(mapJson.getString("nickname"))
                    .setUserGender(mapJson.getInteger("gender"))
                    .setUserBirthdate(mapJson.getDate("birthdate"))
                    .setUserProvince(address.get(0))
                    .setUserCity(address.get(1))
                    .setUserTown(address.get(2));

            if(userService.updateUser(user)){
                ChatroomUser resUser=userService.getUserByPhone(phone.toString());
                resUser.setUserPassword(null);
                return JSONResponseUtil.ok("注册成功",resUser);
            }else{
                return JSONResponseUtil.errormessage("NULL");
            }
    }
}
