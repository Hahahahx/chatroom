package com.ux.mapper.entity.DTO;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.Date;

//查询群组中所有的用户信息
@Data
public class GroupUserListDTO {

    private int groupListId;
    private int  groupListUserid;
    private int  groupListGroupid;
    private int  groupListUserStatus;
    private String  groupListUserRemark;
    private int groupStatus;

    private int userId;
    private String userPhone;
    private String userNickname;
    private String userHeader;
    private String userEmail;
    private int userGender;
    private Date userBirthdate;
    private String userProvince;
    private String userCity;
    private String userTown;
    private String userAddress;
    private String userDescription;
    private String userBackground;
    private int userStatus;

}
