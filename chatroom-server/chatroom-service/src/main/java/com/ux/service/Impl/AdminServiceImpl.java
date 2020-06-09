package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.DTO.ChatroomAdmin;
import com.ux.mapper.mapper.ChatroomAdminMapper;
import com.ux.service.AdminService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    ChatroomAdminMapper adminMapper;

    @Override
    public ChatroomAdmin getAdminUser(String username, String password) {
        Wrapper<ChatroomAdmin> wrapper = new QueryWrapper<ChatroomAdmin>()
                .eq("admin_username",username)
                .eq("admin_password",password);
        return adminMapper.selectOne(wrapper);
    }
}
