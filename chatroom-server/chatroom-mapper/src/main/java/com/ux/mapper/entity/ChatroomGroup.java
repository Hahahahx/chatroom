package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ChatroomGroup extends Model<ChatroomGroup> {

    @TableId("group_id")
    private int groupId;
    private String  groupCreateUser;
    private String  groupName;
    private String  groupBrief;
    private String  groupHeader;
    private long  groupCode;
    private Date groupCreatetime;
    private int groupStatus;

    @Override
    protected Serializable pkVal(){
        return this.groupId;
    }
}
