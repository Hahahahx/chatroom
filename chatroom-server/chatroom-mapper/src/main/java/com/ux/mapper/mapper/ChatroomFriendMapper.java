package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomFriend;
import com.ux.mapper.entity.DTO.FriendDTO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChatroomFriendMapper extends BaseMapper<ChatroomFriend> {

    @Select("Select * from chatroom_friend a,chatroom_user b,chatroom_friend_group c " +
            "where a.friend_friend_phone = b.user_phone " +
            "and a.friend_group_id = c.friend_group_id " +
            "and a.friend_user_phone = #{phone}")
    List<FriendDTO> selectFriendList(@Param("phone") String phone);

    @Select("Select * from chatroom_friend a,chatroom_user b,chatroom_friend_group c " +
            "where a.friend_friend_phone = b.user_phone " +
            "and a.friend_group_id = c.friend_group_id " +
            "and a.friend_user_phone = #{phone} and a.friend_friend_phone = #{friendPhone}")
    FriendDTO selectFriend(@Param("phone") String phone,@Param("friendPhone") String friendPhone);

}
