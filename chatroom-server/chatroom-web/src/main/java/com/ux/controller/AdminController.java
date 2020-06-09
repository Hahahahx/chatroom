package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.ChatroomUserDisable;
import com.ux.mapper.entity.DTO.ChatroomAdmin;
import com.ux.service.AdminService;
import com.ux.service.GroupService;
import com.ux.service.ReportService;
import com.ux.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RequestMapping("/admin")
@RestController
public class AdminController {

    @Resource
    AdminService adminService;
    @Resource
    UserService userService;
    @Resource
    GroupService groupService;
    @Resource
    ReportService reportService;
    @Resource
    DefaultSchedulingConfigurer defaultSchedulingConfigurer;

    @PostMapping("/login")
    public JSONResponseUtil login(@RequestBody JSONObject data){
        String username = data.getString("username");
        String password = data.getString("password");
        ChatroomAdmin adminUser = adminService.getAdminUser(username,password);
        if(adminUser!=null){
            return JSONResponseUtil.ok("success");
        }else{
            return JSONResponseUtil.errormessage("failure");
        }
    }

    @GetMapping("/user/all")
    public JSONResponseUtil getAllUser(){
        return JSONResponseUtil.ok("ok",userService.getAll());
    }

    @PostMapping("/user/handle/disable")
    public JSONResponseUtil handleUserDisable(@RequestBody JSONObject data){
        int id = data.getInteger("id");
        String reason = data.getString("reason");
        int status = data.getInteger("status");

        Wrapper<ChatroomUserDisable> wrapper = new QueryWrapper<ChatroomUserDisable>()
                .eq("disable_user_id",id);
        List<ChatroomUserDisable> disables = new ChatroomUserDisable().selectList(wrapper);
        for(ChatroomUserDisable disable:disables){
            disable.setDisableStatus(false).updateById();
        }

        ChatroomUserDisable disable = new ChatroomUserDisable();
        disable.setDisableUserId(id)
                .setDisableReason(reason)
                .setDisableDays(status)
                .setDisableStatus(true)
                .insert();
        userService.setUserStatus(id,-1);
        if(status != -1){
            Date d=new Date();
            defaultSchedulingConfigurer.addTriggerTaskOneTime(new Date(d.getTime() + status * 24 * 60 * 60 * 1000), new Runnable() {
                @Override
                public void run() {
                    userService.setUserStatus(id,0);
                    Wrapper<ChatroomUserDisable> wrapper = new QueryWrapper<ChatroomUserDisable>()
                            .eq("disable_user_id",id);
                    List<ChatroomUserDisable> disables = new ChatroomUserDisable().selectList(wrapper);
                    for(ChatroomUserDisable disable:disables){
                        disable.setDisableStatus(false).updateById();
                    }
                }
            });
        }
        return JSONResponseUtil.ok("ok",userService.getAll());
    }

    @GetMapping("/user/handle/active/{id}")
    public JSONResponseUtil handleUserActive(@PathVariable int id){
        userService.setUserStatus(id,0);
        Wrapper<ChatroomUserDisable> wrapper = new QueryWrapper<ChatroomUserDisable>()
                .eq("disable_user_id",id);
        List<ChatroomUserDisable> disables = new ChatroomUserDisable().selectList(wrapper);
        for(ChatroomUserDisable disable:disables){
            disable.setDisableStatus(false).updateById();
        }
        return JSONResponseUtil.ok("ok",userService.getAll());
    }

    @GetMapping("/group/all")
    public JSONResponseUtil getAllGroup(){
        return JSONResponseUtil.ok("ok",groupService.getAll());
    }

    @GetMapping("/group/handle/{id}")
    public JSONResponseUtil handleGroup(@PathVariable int id){
        ChatroomGroup group = new ChatroomGroup().selectById(id);
        if(group.getGroupStatus() == -1){
            groupService.updateGroupStatus(id,0);
        }else {
            groupService.updateGroupStatus(id,-1);
        }
        return JSONResponseUtil.ok("ok",groupService.getAll());
    }


    @GetMapping("/report/all")
    public JSONResponseUtil getAllReport(){
        return JSONResponseUtil.ok("ok",reportService.getAll());
    }


    @GetMapping("/report/handle/{id}")
    public JSONResponseUtil handleReport(@PathVariable int id){
        reportService.setReport(id,true);
        return JSONResponseUtil.ok("ok",reportService.getAll());
    }
}
