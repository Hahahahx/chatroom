package com.ux.mapper.entity.DTO;


import lombok.Data;

import java.util.Date;

//查询用户所有的群组信息
@Data
public class UserGroupListDTO {

    private int groupListId;
    private int  groupListUserid;
    private int  groupListGroupid;
    private int  groupListUserStatus;
    private String  groupListUserRemark;

    private int groupId;
    private String  groupCreateUser;
    private String  groupName;
    private String  groupBrief;
    private String  groupHeader;
    private long  groupCode;
    private Date groupCreatetime;

}