package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomGroupList;
import com.ux.mapper.entity.DTO.GroupUserListDTO;
import com.ux.mapper.entity.DTO.UserGroupListDTO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChatroomGroupListMapper extends BaseMapper<ChatroomGroupList> {

    @Select("Select * from chatroom_group_list a , chatroom_user b where a.group_list_user_phone = b.user_phone and a.group_list_groupid = #{id}")
    List<GroupUserListDTO> selectUserListFromGroup(@Param("id") int id);

    @Select("Select * from chatroom_group_list a , chatroom_group b where a.group_list_groupid = b.group_id and a.group_list_user_phone = #{phone}")
    List<UserGroupListDTO> selectGroupListFromUser(@Param("phone") String phone);

}