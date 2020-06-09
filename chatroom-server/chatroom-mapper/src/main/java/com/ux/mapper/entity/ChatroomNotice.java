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
public class ChatroomNotice extends Model<ChatroomNotice> {

    @TableId("notice_id")
    private int noticeId;
    private String  noticeUserPhone;
    private String  noticeFrom;
    private String  noticeContent;
    private int  noticeStatus;
    private String  noticeCreatetime;
    private boolean noticeRead;

    @Override
    protected Serializable pkVal(){
        return this.noticeId;
    }
}
