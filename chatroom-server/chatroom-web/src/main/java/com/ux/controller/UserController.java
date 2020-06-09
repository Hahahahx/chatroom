package com.ux.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ux.common.ImageUtil;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.FriendDTO;
import com.ux.service.FriendService;
import com.ux.service.SocketIOService;
import com.ux.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RequestMapping("/user")
@RestController
public class UserController {


    @Resource
    FriendService friendService;
    @Resource
    UserService userService;
    @Resource
    SocketIOService socketIOService;
    @Resource
    private RedisTemplate<String,Object> redisTemplate;


    @Value("${image-server.realpath}")
    String realPath;
    @Value("${image-server.urlpath}")
    String urlPath;

    @GetMapping("/{phone}")
    public JSONResponseUtil getUserByPhone(@PathVariable String phone, HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        FriendDTO friend = friendService.getFriend(userPhone.toString(),phone);
        System.out.println("查询好友"+friend);
        if (friend == null){
            ChatroomUser user = userService.getUserByPhone(phone);
            if(user!=null){
                user.setUserPassword(null);
            }
            return JSONResponseUtil.ok("ok",user);
        }
        return  JSONResponseUtil.ok("ok",friend);
    }


    @PutMapping("set")
    public JSONResponseUtil setUser(@RequestBody String jsondata,HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        ChatroomUser user= JSONObject.parseObject(jsondata,ChatroomUser.class);
        userService.updateUser(user);
        return JSONResponseUtil.ok("ok",null);
    }



    @PostMapping("set/header")
    public JSONResponseUtil setUserHeader(MultipartFile avatar,HttpSession session) throws IOException {
        Object userPhone = session.getAttribute("chatroom_phone");
        String name =  ImageUtil.uploadImage(avatar,realPath);
        ChatroomUser user = userService.setUserHeader(userPhone.toString(),urlPath+name);
        return JSONResponseUtil.ok("ok",user);
    }

    @PutMapping("set/background")
    public JSONResponseUtil setUserBackground(@RequestBody String jsondata,HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        ChatroomUser user =  userService.setUserBackground(userPhone.toString(),mapJson.getString("img"));
        return JSONResponseUtil.ok("ok",user);
    }

    @GetMapping("/list/{condition}")
    public JSONResponseUtil getUserByCondition(@PathVariable String condition, HttpSession session){
        List<ChatroomUser> users = userService.getUserByCondition(condition);
        return JSONResponseUtil.ok("ok",users);
    }
}
