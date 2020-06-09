package com.ux.service;


import com.ux.mapper.entity.ChatroomUser;

import java.util.List;

public interface UserService {
    public int createUser(String phone);
    public ChatroomUser getUserByPhone(String phone);
    public List<ChatroomUser> getUserByCondition(String condition);
    public List<ChatroomUser> getAll();
    public Boolean updateUser(ChatroomUser user);
    public ChatroomUser setUserBackground(String phone, String img);
    public ChatroomUser setUserHeader(String phone,String header);
    public Boolean setUserStatus(int id,int status);
}
