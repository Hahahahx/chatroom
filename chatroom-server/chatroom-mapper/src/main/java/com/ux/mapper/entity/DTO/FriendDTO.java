package com.ux.mapper.entity.DTO;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class FriendDTO {




    private int friendId;
    private String friendUserPhone;
    private String friendFriendPhone;
    private String friendRemark;
    private int friendGroupId;
    private Date friendCreatetime;
    private int friendDel;

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

    private String friendGroupName;
    private boolean friendGroupCode;
    private int friendGroupRand;

}
