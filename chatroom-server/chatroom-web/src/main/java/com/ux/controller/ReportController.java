package com.ux.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.ux.common.ImageBase64Util;
import com.ux.common.JSONResponseUtil;
import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.ReportDTO;
import com.ux.service.ReportService;
import com.ux.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/report")
@RestController
public class ReportController {

    @Resource
    ReportService reportService;


    @Value("${image-server.realpath}")
    String realPath;
    @Value("${image-server.urlpath}")
    String urlPath;

    @GetMapping("/{id}")
    public JSONResponseUtil getReport(@PathVariable int id,HttpSession session){
        List<ReportDTO> reportDTOS =  reportService.getReportByUser(id);
        return JSONResponseUtil.ok("ok",reportDTOS);
    }


    @PostMapping("/add")
    public JSONResponseUtil addReport(@RequestBody JSONObject jsondata,HttpSession session){
        int from = jsondata.getInteger("from");
        int to = jsondata.getInteger("to");

        ChatroomReport report = reportService.getReportByToUser(from,to);
        if(report != null && !report.isReportStatus() ){
            return JSONResponseUtil.errormessage("感谢您的积极反馈，您的上一次发布的举报任务还在处理中...");
        }

        String content  = jsondata.getString("content");
        String message = jsondata.getString("message");
        int type = jsondata.getInteger("type");
        boolean isgroup = jsondata.getBoolean("isgroup");
        List<String> images = jsondata.getObject("images",new TypeReference<List<String>>(){});

        List<String> imageNames = new ArrayList<>();
        for(String img : images){
            String name = ImageBase64Util.decodeBase64ToImage(img,realPath);
            imageNames.add(urlPath+name);
        }
        reportService.addReport(from,to,content,message,type,imageNames,isgroup);
        return JSONResponseUtil.ok("ok");
    }


}
