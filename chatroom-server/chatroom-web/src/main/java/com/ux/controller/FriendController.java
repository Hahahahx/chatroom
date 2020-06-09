package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomFriendGroup;
import com.ux.mapper.entity.ChatroomNotice;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.FriendDTO;
import com.ux.mapper.entity.DTO.NoticeUserDTO;
import com.ux.service.*;
import com.ux.service.enumerate.MsgEnum;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/friend")
@RestController
public class FriendController {

    @Resource
    FriendService friendService;
    @Resource
    FriendGroupService friendGroupService;
    @Resource
    SocketIOService socketIOService;
    @Resource
    NoticeService noticeService;
    @Resource
    TemporaryService temporaryService;

    @PatchMapping("/application")
    public JSONResponseUtil applicationFriend(@RequestBody String jsondata,HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        JSONObject mapJson= JSONObject.parseObject(jsondata);

        String currnetUser =  phone.toString();
        String sendUser = mapJson.getString("phone");
        String content = mapJson.getString("content");

        Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                .eq("user_phone",currnetUser);
        ChatroomUser user = new ChatroomUser().selectOne(wrapper);;

        //在双方列表中添加通知
        noticeService.addNotice(currnetUser,sendUser,content,-1,false);  //当前
        noticeService.addNotice(sendUser,currnetUser,content,0,true);   //对方

        Map<String,Object> map = new HashMap<>();
        map.put("type","好友申请");
        map.put("name",user.getUserNickname());
        map.put("content",content);
        socketIOService.pushMessageToUser(MsgEnum.NEW_NOTICE,sendUser,map);

        return JSONResponseUtil.ok("ok");
    }

    @PostMapping("/add")
    public void addFriend(@RequestBody String jsondata,HttpSession session){
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        Object phone = session.getAttribute("chatroom_phone");
        //好友列表中添加
        friendService.addFriend(phone.toString(),mapJson.getString("phone"));
    }

    @DeleteMapping("/delete/{phone}")
    public JSONResponseUtil deleteFriend(@PathVariable String phone,HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        //好友列表中删除对方
        ChatroomUser user = friendService.deleteFriend(userPhone.toString(),phone);
        //从对方好友列表中删除自己
        friendService.deleteFriend(phone,userPhone.toString());
        temporaryService.deleteTemporary(phone,userPhone.toString());
        temporaryService.deleteTemporary(userPhone.toString(),phone);


        return JSONResponseUtil.ok("ok",user);
    }


    @GetMapping("/list")
    public JSONResponseUtil getList(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        List<FriendDTO> friendList = friendService.getFriendList(phone.toString());
        return JSONResponseUtil.ok("ok",friendList);
    }

    @PutMapping("/remark")
    public JSONResponseUtil setRemark(@RequestBody String jsondata, HttpSession session){
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        Object phone = session.getAttribute("chatroom_phone");
        FriendDTO user = friendService.setRemark(phone.toString(),mapJson.getString("phone"),mapJson.getString("remark"));
        return JSONResponseUtil.ok("ok",user);
    }
    @PutMapping("/set/group")
    public JSONResponseUtil setGroup(@RequestBody String jsondata, HttpSession session){
        JSONObject mapJson= JSONObject.parseObject(jsondata);
        Object phone = session.getAttribute("chatroom_phone");
        FriendDTO user = friendService.setGroup(phone.toString(),mapJson.getString("phone"),mapJson.getInteger("group"));
        return JSONResponseUtil.ok("ok",user);
    }
    @GetMapping("/get/group")
    public JSONResponseUtil getGroup(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        List<ChatroomFriendGroup> friendGroupList = friendGroupService.selectGroup(phone.toString());
        return JSONResponseUtil.ok("ok",friendGroupList);
    }
}