package com.ux.mapper.entity.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class NoticeUserDTO {

    private int noticeId;
    private String  noticeUserPhone;
    private String  noticeFrom;
    private String  noticeContent;
    private int  noticeStatus;
    private String  noticeCreatetime;
    private boolean noticeRead;

    private int userId;
    private String userPhone;
    private String userNickname;
    private String userHeader;
}
