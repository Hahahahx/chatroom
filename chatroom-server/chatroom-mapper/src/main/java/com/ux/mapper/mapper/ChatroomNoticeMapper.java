package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.ChatroomNotice;
import com.ux.mapper.entity.DTO.NoticeGroupDTO;
import com.ux.mapper.entity.DTO.NoticeUserDTO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChatroomNoticeMapper extends BaseMapper<ChatroomNotice> {

    @Select("select * from chatroom_notice a,chatroom_user b " +
            "where a.notice_from = b.user_phone " +
            "and a.notice_user_phone = #{phone} " +
            "order by notice_createtime desc")
    List<NoticeUserDTO> selectUserNotice(@Param("phone") String phone);

    @Select("select * from chatroom_notice a,chatroom_user b,chatroom_group c" +
            " where a.notice_from = b.user_phone " +
            "and a.notice_group_code = c.group_code " +
            "and trim(notice_group_code) is not null " +
            "and a.notice_from = #{phone} " +
            "order by notice_createtime desc")
    List<NoticeGroupDTO> selectGroupNotice(@Param("phone") String phone);




}
