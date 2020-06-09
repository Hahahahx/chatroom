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
public class ChatroomReport extends Model<ChatroomReport> {

    @TableId("report_id")
    private int reportId;
    private int reportFrom;
    private int reportTo;
    private int reportType;
    private String reportContent;
    private String reportMessage;
    private Date reportCreatetime;
    private boolean reportStatus;
    private boolean reportIsgroup;

    @Override
    protected Serializable pkVal(){
        return this.reportId;
    }
}
