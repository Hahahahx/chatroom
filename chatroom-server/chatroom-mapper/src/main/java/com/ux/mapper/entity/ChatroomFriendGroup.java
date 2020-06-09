package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ChatroomFriendGroup extends Model<ChatroomFriendGroup> {

    @TableId("friend_group_id")
    private int friendGroupId;
    private String friendGroupName;
    private String friendGroupUserPhone;;
    private boolean friendGroupCode;
    private int friendGroupRand;

    @Override
    protected Serializable pkVal(){
        return this.friendGroupId;
    }
}