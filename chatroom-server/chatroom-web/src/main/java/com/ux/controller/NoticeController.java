package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.NoticeGroupDTO;
import com.ux.mapper.entity.DTO.NoticeUserDTO;
import com.ux.service.FriendService;
import com.ux.service.NoticeService;
import com.ux.service.SocketIOService;
import com.ux.service.enumerate.MsgEnum;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/notice")
@RestController
public class NoticeController {
    @Resource
    NoticeService noticeService;
    @Resource
    FriendService friendService;
    @Resource
    SocketIOService socketIOService;

    @Resource
    private RedisTemplate<String,Object> redisTemplate;


    @GetMapping("/ask")
    public JSONResponseUtil getNewNotice(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        int count = socketIOService.pushNewMessage(phone.toString());
        if(count == 0){
            return JSONResponseUtil.errormessage("没有消息");
        }else{
            return JSONResponseUtil.ok("收到"+count+"条新消息");
        }
    }

    @GetMapping("/list")
    public JSONResponseUtil getUserNotice(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        List<NoticeUserDTO> userList =  noticeService.getUserNotice(phone.toString());
        return JSONResponseUtil.ok("ok",userList);
    }


    @GetMapping("/read")
    public JSONResponseUtil setRead(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        int updateCount =  noticeService.updateNoticeRead(phone.toString());
        return JSONResponseUtil.ok("updateCount",updateCount);
    }

    @PutMapping("/handle/application")
    public JSONResponseUtil setStatus(@RequestBody String jsondata, HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        JSONObject mapJson= JSONObject.parseObject(jsondata);

        String currnetUser =  phone.toString();
        String sendUser = mapJson.getString("user");
        int status = mapJson.getInteger("status");
        if(status == 1){
            friendService.addFriend(currnetUser,sendUser);
            friendService.addFriend(sendUser,currnetUser);
        }
        noticeService.updateNoticeStatus(sendUser,status);
        noticeService.updateNoticeStatus(currnetUser,status);


        Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                .eq("user_phone",currnetUser);
        ChatroomUser user = new ChatroomUser().selectOne(wrapper);

        Map<String,Object> map = new HashMap<>();
        map.put("type","好友申请");
        map.put("name",user.getUserNickname());
        map.put("content",status==1?"同意了您的请求":"拒绝了您的请求");
        socketIOService.pushMessageToUser(MsgEnum.NEW_NOTICE,sendUser,map);

        return JSONResponseUtil.ok("ok",noticeService.getUserNotice(currnetUser));
    }

    @GetMapping("/delete/{id}")
    public JSONResponseUtil deleteNotice(@PathVariable int id, HttpSession session){
        if(noticeService.deleteNotice(id)){
            return JSONResponseUtil.ok("ok");
        }
        return  JSONResponseUtil.errormessage("error");
    }


    @GetMapping("/empty")
    public JSONResponseUtil emptyNotice(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        int i =noticeService.emptyNotice(phone.toString());
        if(i>0){
            return JSONResponseUtil.ok("成功删除了"+i+"条信息");
        }else {
            return JSONResponseUtil.errormessage("没有通知清空");
        }
    }


}
