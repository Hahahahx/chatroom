package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomFriend;
import com.ux.mapper.entity.ChatroomGroup;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChatroomGroupMapper extends BaseMapper<ChatroomGroup> {

    @Select("select *,max(group_id) from chatroom_group")
    ChatroomGroup selectLastGroup();

}
