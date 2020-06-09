package com.ux.mapper.entity.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class NoticeGroupDTO {


    private int noticeId;
    private String  noticeUserPhone;
    private long noticeGroupCode;
    private String  noticeFrom;
    private String  noticeContent;
    private int  noticeStatus;
    private String  noticeCreatetime;
    private boolean noticeRead;

    private int userId;
    private String userPhone;
    private String userNickname;
    private String userHeader;


    private int groupId;
    private String  groupName;
    private String  groupHeader;
    private long  groupCode;
}
