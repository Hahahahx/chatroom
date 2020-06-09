package com.ux.controller;


import com.alibaba.fastjson.JSONObject;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.DTO.TemporaryDTO;
import com.ux.service.TemporaryService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("/temporary")
@RestController
public class TemporaryController {

   /* @Resource
    private RedisTemplate<String,Object> redisTemplate;

    @GetMapping("/list")
    public Object getList(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        return redisTemplate.opsForHash().get("temporaryList",phone);
    }

    @PutMapping("/set")
    public void setList(@RequestBody String jsondata,HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        redisTemplate.opsForHash().put("temporaryList",phone,jsondata);
    }
*/


    @Resource
    private RedisTemplate<String,Object> redisTemplate;

    @Resource
    TemporaryService temporaryService;

    @GetMapping("/list")
    public JSONResponseUtil getList(HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        List<TemporaryDTO> temporaryDTO = temporaryService.getTemporary(phone.toString());
        return JSONResponseUtil.ok("ok",temporaryDTO);
    }

    @PutMapping("/set")
    public JSONResponseUtil setList(@RequestBody String jsondata, HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        JSONObject map = JSONObject.parseObject(jsondata);
        System.out.println(jsondata);
        String from = map.getString("from");
        Boolean isGroup = map.getBoolean("group");
        System.out.println(isGroup);
        List<TemporaryDTO> temporaryDTO = temporaryService.setTemporary(phone.toString(),from,isGroup);
        return JSONResponseUtil.ok("ok",temporaryDTO);
    }

    @DeleteMapping("delete/{id}")
    public JSONResponseUtil deleteList(@PathVariable int id, HttpSession session){
        Object phone = session.getAttribute("chatroom_phone");
        temporaryService.deleteTemporary(id);
        return JSONResponseUtil.ok("ok",temporaryService.getTemporary(phone.toString()));
    }



}
