package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.ChatroomFriend;
import com.ux.mapper.entity.ChatroomFriendGroup;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.FriendDTO;
import com.ux.mapper.mapper.ChatroomFriendMapper;
import com.ux.service.FriendService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {

    @Resource
    ChatroomFriendMapper chatroomFriendMapper;


    @Override
    public FriendDTO getFriend(String phone,String friendPhone) {
        return chatroomFriendMapper.selectFriend(phone,friendPhone);
    }

    @Override
    public List<FriendDTO> getFriendList(String phone) {
        return chatroomFriendMapper.selectFriendList(phone);
    }

    @Override
    public boolean addFriend(String userphone, String friendphone){
        ChatroomFriend friend = new ChatroomFriend();
        ChatroomFriendGroup friendGroup = new ChatroomFriendGroup();

        //默认分组
        Wrapper<ChatroomFriendGroup> wrapperGroup = new QueryWrapper<ChatroomFriendGroup>()
                .eq("friend_group_user_phone",userphone)
                .eq("friend_group_code",0);

        //如果好友列表为空 则创建一个默认分组"我的好友"
        if( friendGroup.selectOne(wrapperGroup) == null ){

            friendGroup.setFriendGroupName("我的好友")
                    .setFriendGroupUserPhone(userphone)
                    .setFriendGroupCode(false)
                    .setFriendGroupRand(0)
                    .insert();
        }


        return friend.setFriendUserPhone(userphone)
                    .setFriendGroupId(friendGroup.selectOne(wrapperGroup).getFriendGroupId())
                    .setFriendFriendPhone(friendphone)
                    .insert();
    }

    @Override
    public ChatroomUser deleteFriend(String userphone, String friendphone) {
        ChatroomFriend friend = new ChatroomFriend();
        Wrapper<ChatroomFriend> wrapper = new QueryWrapper<ChatroomFriend>()
                .eq("friend_user_phone",userphone)
                .eq("friend_friend_phone",friendphone);
        friend.delete(wrapper);
        ChatroomUser user = new ChatroomUser();
        Wrapper<ChatroomUser> wrapper1 = new QueryWrapper<ChatroomUser>()
                .eq("user_phone",friendphone);
        return user.selectOne(wrapper1);
    }

    @Override
    public FriendDTO setRemark(String userphone, String friendphone, String remark) {

        ChatroomFriend friend = new ChatroomFriend();
        Wrapper<ChatroomFriend> wrapper = new QueryWrapper<ChatroomFriend>()
                .eq("friend_user_phone",userphone)
                .eq("friend_friend_phone",friendphone);
        friend.selectOne(wrapper)
                .setFriendRemark(remark)
                .updateById();
        return chatroomFriendMapper.selectFriend(userphone,friendphone);
    }

    @Override
    public FriendDTO setGroup(String userphone, String friendphone, int groupId) {

        ChatroomFriend friend = new ChatroomFriend();
        Wrapper<ChatroomFriend> wrapper = new QueryWrapper<ChatroomFriend>()
                .eq("friend_user_phone",userphone)
                .eq("friend_friend_phone",friendphone);

        friend.selectOne(wrapper)
                .setFriendGroupId(groupId)
                .updateById();
        return chatroomFriendMapper.selectFriend(userphone,friendphone);
    }


}