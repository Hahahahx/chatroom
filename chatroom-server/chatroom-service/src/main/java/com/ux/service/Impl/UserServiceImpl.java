package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.mapper.ChatroomUserMapper;
import com.ux.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<ChatroomUserMapper,ChatroomUser> implements UserService {


    @Resource
    ChatroomUserMapper userMapper;

    /**
     * 创建用户
     */
    public int createUser(String phone){
        ChatroomUser user = new ChatroomUser();
        user.setUserPhone(phone);
        user.insert();
        Wrapper<ChatroomUser> wrapper =new QueryWrapper<ChatroomUser>()
                .eq("user_phone",phone);
        return this.baseMapper.selectOne(wrapper).getUserId();
    }


    /**
     * 手机号查找用户
     * */
    @Override
    public ChatroomUser getUserByPhone(String phone){
        Wrapper<ChatroomUser> wrapper =new QueryWrapper<ChatroomUser>()
                .eq("user_phone",phone);
        return this.baseMapper.selectOne(wrapper);
    }

    @Override
    public List<ChatroomUser> getUserByCondition(String condition) {
        Wrapper<ChatroomUser> wrapper =new QueryWrapper<ChatroomUser>()
                .select("user_description","user_header","user_phone","user_nickname","user_gender","user_birthdate","user_town","user_province","user_city")
                .like("user_nickname",condition);
        return this.baseMapper.selectList(wrapper);
    }

    @Override
    public List<ChatroomUser> getAll() {
        return new ChatroomUser().selectAll();
    }


    /**
     * 模糊搜索用户
     */
    public Object findUser(ChatroomUser user){
        Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                .eq("user_nickname",user.getUserNickname()).or()
                .eq("user_brithdate",user.getUserBirthdate()).or()
                .eq("user_province",user.getUserProvince()).or()
                .eq("user_city",user.getUserCity()).or()
                .eq("user_twon",user.getUserTown()).or()
                .eq("user_gender",user.getUserGender());
        return this.baseMapper.selectList(wrapper);
    }

    /**
     * 创建或更新用户
     * */
    @Override
    public Boolean updateUser(ChatroomUser user) {
        return user.updateById();
    }

    @Override
    public ChatroomUser setUserBackground(String phone, String img) {
        Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                .eq("user_phone",phone);
        ChatroomUser user = userMapper.selectOne(wrapper);
        user.setUserBackground(img).updateById();
        return user;
    }

    @Override
    public ChatroomUser setUserHeader(String phone, String header) {
        Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                .eq("user_phone",phone);
        ChatroomUser user = userMapper.selectOne(wrapper);
        user.setUserHeader(header).updateById();
        return user;
    }

    @Override
    public Boolean setUserStatus(int id, int status) {
        return new ChatroomUser()
                .setUserId(id)
                .setUserStatus(status)
                .updateById();
    }
}
