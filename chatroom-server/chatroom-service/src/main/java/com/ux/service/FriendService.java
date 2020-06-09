package com.ux.service;

import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.entity.DTO.FriendDTO;

import java.util.List;

public interface FriendService {


    public FriendDTO getFriend(String phone,String friendPhone);
    public List<FriendDTO> getFriendList(String phone);
    public boolean addFriend(String userphone,String friendphone);
    public ChatroomUser deleteFriend(String userphone, String friendphone);
    public FriendDTO setRemark(String userphone,String friendphone,String remark);
    public FriendDTO setGroup(String userphone,String friendphone,int groupId);
}
