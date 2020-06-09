package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ChatroomGroupList extends Model<ChatroomGroupList> {

    @TableId("group_list_id")
    private int groupListId;
    private String  groupListUserPhone;
    private int  groupListGroupid;
    private int  groupListUserStatus;
    private String  groupListUserRemark;

    @Override
    protected Serializable pkVal(){
        return this.groupListId;
    }
}
