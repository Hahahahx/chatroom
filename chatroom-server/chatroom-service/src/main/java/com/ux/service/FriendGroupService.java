package com.ux.service;

import com.ux.mapper.entity.ChatroomFriendGroup;

import java.util.List;

public interface FriendGroupService {

    public void addGroup(String phone,String name);
    public void deleteGroup(int id);
    public void updateGroup(int id,String name);
    public List<ChatroomFriendGroup> selectGroup(String phone);

}
