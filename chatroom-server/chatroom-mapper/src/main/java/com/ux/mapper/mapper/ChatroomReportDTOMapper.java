package com.ux.mapper.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.DTO.ReportDTO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface ChatroomReportDTOMapper extends BaseMapper<ReportDTO> {

}