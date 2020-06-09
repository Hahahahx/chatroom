package com.ux.service;

import com.ux.mapper.entity.DTO.NoticeGroupDTO;
import com.ux.mapper.entity.DTO.NoticeUserDTO;

import java.util.List;

public interface NoticeService {

    public void addNotice(String phone, String from, String content, int status, boolean read);
    public boolean deleteNotice(int id);
    public int emptyNotice(String phone);
    public int updateNoticeStatus(String phone, int status);
    public int updateNoticeRead(String phone);
    public List<NoticeUserDTO> getUserNotice(String phone);
    public List<NoticeGroupDTO> getGroupNotice(String phone);
}
