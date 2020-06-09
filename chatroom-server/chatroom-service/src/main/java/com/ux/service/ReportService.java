package com.ux.service;

import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.DTO.ReportDTO;

import java.util.List;

public interface ReportService {
    public ChatroomReport getReportByToUser(int from,int to);
    public void addReport(int from,int to,String content,String mssage,int type,List<String> images,boolean isgroup);
    public List<ReportDTO> getReportByUser(int id);
    public List<ReportDTO> getAll();
    public boolean setReport(int id,boolean status);

}
