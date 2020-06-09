package com.ux.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.ux.common.ImageUtil;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.ChatroomGroupList;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.GroupUserListDTO;
import com.ux.service.DTO.GroupList;
import com.ux.service.GroupService;
import com.ux.service.SocketIOService;
import com.ux.service.TemporaryService;
import com.ux.service.enumerate.MsgEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RequestMapping("/group")
@RestController
public class GroupController {

    @Resource
    GroupService groupService;
    @Resource
    SocketIOService socketIOService;
    @Resource
    TemporaryService temporaryService;


    @GetMapping("/{id}")
    public JSONResponseUtil getGroup(@PathVariable int id , HttpSession session) {
        GroupList groupList = groupService.get(id);
        return JSONResponseUtil.ok("ok",groupList);
    }

    @PostMapping("/create")
    public JSONResponseUtil createGroup(@RequestBody String jsondata, HttpSession session) throws Exception {
        Object phone = session.getAttribute("chatroom_phone");
        JSONObject mapJson = JSONObject.parseObject(jsondata);
        List<String> list = mapJson.getObject("users",new TypeReference<List<String>>(){});
        list.add(phone.toString());

        int id = groupService.create( mapJson.getString("name"), mapJson.getString("brief"), mapJson.getString("header"),phone.toString());
        groupService.add(id,list);
        groupService.setStatus(id,phone.toString(),2);
        GroupList groupList = groupService.get(id);
        for(String i :list){
            socketIOService.pushMessageToUser(MsgEnum.NEW_GROUP,i,groupList);
        }

        return JSONResponseUtil.ok("ok",groupList);
    }

    @PutMapping("/add")
    public JSONResponseUtil addUsertoGroup(@RequestBody String jsondata,HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        JSONObject mapJson = JSONObject.parseObject(jsondata);
        int groupId = mapJson.getInteger("group");
        List<String> list = mapJson.getObject("list",new TypeReference<List<String>>(){});
        return JSONResponseUtil.ok("ok",groupService.add(groupId,list));
    }


    @GetMapping("/list")
    public JSONResponseUtil getGroupList(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        return JSONResponseUtil.ok("ok",groupService.getGroupList(phone));
    }


    @PutMapping("set")
    public JSONResponseUtil setUser(@RequestBody String jsondata,HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        ChatroomGroup group= JSONObject.parseObject(jsondata,ChatroomGroup.class);
        groupService.updateGroup(group);
        return JSONResponseUtil.ok("ok",null);
    }


    @Value("${image-server.realpath}")
    String realPath;
    @Value("${image-server.urlpath}")
    String urlPath;

    @PostMapping("set/header")
    public JSONResponseUtil setUserHeader(MultipartFile avatar,int id, HttpSession session) throws IOException {
        Object userPhone = session.getAttribute("chatroom_phone");
        String name =  ImageUtil.uploadImage(avatar,realPath);
        GroupList list = groupService.setGroupHeader(id,urlPath+name);
        return JSONResponseUtil.ok("ok",list);
    }

    @GetMapping("quit/{id}")
    public JSONResponseUtil deleteGroup(@PathVariable int id,HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        groupService.delete(id,userPhone.toString());
        temporaryService.deleteTemporary(id+"",userPhone.toString());

        return JSONResponseUtil.ok("ok",null);
    }


    @GetMapping("delete/{id}")
    public JSONResponseUtil dissolveGroup(@PathVariable int id,HttpSession session){
        Object userPhone = session.getAttribute("chatroom_phone");
        boolean flag = true;
        List<GroupUserListDTO> list = groupService.get(id).getGroupList();
        for(GroupUserListDTO item :list){
            if(item.getUserPhone().equals(userPhone.toString())) {
                groupService.dissolve(id);
                flag = false;
                break;
            }
        }
        if(flag){
            return JSONResponseUtil.errormessage("不是群主");
        }else {

            for(GroupUserListDTO item :list){
                temporaryService.deleteTemporary(id+"",item.getUserPhone());
            }
            return JSONResponseUtil.ok("ok",null);
        }
    }





}
