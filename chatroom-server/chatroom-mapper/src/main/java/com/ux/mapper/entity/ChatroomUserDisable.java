package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)   //阻止重复生成Equal和hashcode方法
@Accessors(chain = true)
public class ChatroomUserDisable extends Model<ChatroomUserDisable> {

    @TableId("disable_id")
    private int disableId;
    private int disableUserId;
    private String disableReason;
    private int disableDays;
    private boolean disableStatus;
    private Date disableCreatetime;


    @Override
    protected Serializable pkVal(){
        return this.disableId;
    }
}
