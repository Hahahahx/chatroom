package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.ChatroomReportImg;
import com.ux.mapper.entity.DTO.ReportDTO;
import com.ux.mapper.mapper.ChatroomReportMapper;
import com.ux.service.ReportService;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
public class ReportServiceImpl implements ReportService {

    @Resource
    ChatroomReportMapper reportMapper ;

    @Override
    public ChatroomReport getReportByToUser(int from, int to) {
        return reportMapper.selectByToUser(from,to);
    }

    @Transactional(rollbackFor = {RuntimeException.class, Error.class})
    @Override
    public void addReport(int from, int to, String content, String mssage, int type, List<String> images,boolean isgroup) {
        ChatroomReport report = new ChatroomReport();
        report.setReportFrom(from)
                .setReportTo(to)
                .setReportContent(content)
                .setReportMessage(mssage)
                .setReportType(type)
                .setReportIsgroup(isgroup)
                .insert();
        Wrapper<ChatroomReport> wrapper = new QueryWrapper<ChatroomReport>()
                .eq("report_from",from)
                .eq("report_to",to)
                .eq("report_status",0);
        int id = report.selectOne(wrapper).getReportId();
        for(String img : images){
            new ChatroomReportImg()
                    .setReportId(id)
                    .setReportImgName(img)
                    .insert();
        }
    }

    @Override
    public List<ReportDTO> getReportByUser(int id) {
        Wrapper<ReportDTO> wrapper = new QueryWrapper<ReportDTO>()
                .eq("report_from",id);
        return new ReportDTO().selectList(wrapper);
    }

    @Override
    public List<ReportDTO> getAll() {
        return new ReportDTO().selectAll();
    }

    @Override
    public boolean setReport(int id, boolean status) {
        ChatroomReport report = new ChatroomReport().selectById(id);
        report.setReportStatus(status);
        return report.updateById();
    }


}
