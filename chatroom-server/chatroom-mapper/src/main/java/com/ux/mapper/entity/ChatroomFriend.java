package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ChatroomFriend extends Model<ChatroomFriend> {

    @TableId("friend_id")
    private int friendId;
    private String friendUserPhone;
    private String friendFriendPhone;
    private String friendRemark;
    private int friendGroupId;
    private Date friendCreatetime;
    private int friendDel;


    @Override
    protected Serializable pkVal(){
        return this.friendId;
    }
}
