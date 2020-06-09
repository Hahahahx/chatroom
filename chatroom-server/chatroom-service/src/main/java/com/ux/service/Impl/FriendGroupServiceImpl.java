package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ux.mapper.entity.ChatroomFriendGroup;
import com.ux.mapper.mapper.ChatroomFriendGroupMapper;
import com.ux.service.FriendGroupService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendGroupServiceImpl extends ServiceImpl<ChatroomFriendGroupMapper, ChatroomFriendGroup> implements FriendGroupService {

    @Override
    public void addGroup(String phone, String name) {
        ChatroomFriendGroup friendGroup = new ChatroomFriendGroup();
        friendGroup.setFriendGroupUserPhone(phone)
                .setFriendGroupName(name)
                .insert();
    }

    @Override
    public void deleteGroup(int id) {
        this.baseMapper.deleteById(id);
    }

    @Override
    public void updateGroup(int id, String name) {
        ChatroomFriendGroup friendGroup = new ChatroomFriendGroup();
        friendGroup.setFriendGroupId(id)
                .setFriendGroupName(name)
                .updateById();
    }

    @Override
    public List<ChatroomFriendGroup> selectGroup(String phone) {
        Wrapper<ChatroomFriendGroup> wrapper = new QueryWrapper<ChatroomFriendGroup>()
                .eq("friend_group_user_phone", phone);
        return this.baseMapper.selectList(wrapper);
    }
}
   