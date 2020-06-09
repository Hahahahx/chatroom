package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomGroupList;
import com.ux.mapper.entity.ChatroomTemporary;
import com.ux.mapper.entity.DTO.GroupUserListDTO;
import com.ux.mapper.entity.DTO.TemporaryDTO;
import com.ux.mapper.entity.DTO.UserGroupListDTO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChatroomTemporaryMapper extends BaseMapper<ChatroomTemporary> {

    @Select("Select * from chatroom_temporary where temporary_user_phone = #{phone} order by temporary_updatetime desc")
    List<TemporaryDTO> selectTemporaryList(@Param("phone") String phone);

}