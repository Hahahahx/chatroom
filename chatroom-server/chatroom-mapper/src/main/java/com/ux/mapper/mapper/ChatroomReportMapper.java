package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.ChatroomTemporary;
import com.ux.mapper.entity.DTO.ReportDTO;
import com.ux.mapper.entity.DTO.TemporaryDTO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChatroomReportMapper extends BaseMapper<ChatroomReport> {

    @Select("Select *,max(report_createtime) from chatroom_report where report_from = #{from} and report_to = #{to}")
    ChatroomReport selectByToUser(@Param("from")int from,@Param("to")int to);

}