package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)   //阻止重复生成Equal和hashcode方法
@Accessors(chain = true)
public class ChatroomUser extends Model<ChatroomUser> {

    @TableId("user_id")
    private int userId;
    private String userPhone;
    private String userPassword;
    private String userNickname;
    private String userRealname;
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
    private Date userCreatetime;
    private int userStatus;

    @TableField(exist = false)
    private List<ChatroomUserDisable> userDisables;

    public List<ChatroomUserDisable> getUserDisables(){
        Wrapper<ChatroomUserDisable> wrapper = new QueryWrapper<ChatroomUserDisable>()
                .eq("disable_user_id",this.userId);
        return new ChatroomUserDisable().selectList(wrapper);
    }


    @Override
    protected Serializable pkVal(){
        return this.userId;
    }
}
