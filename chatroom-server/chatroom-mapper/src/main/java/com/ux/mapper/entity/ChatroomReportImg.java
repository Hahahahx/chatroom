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
public class ChatroomReportImg extends Model<ChatroomReportImg> {

    @TableId("report_img_id")
    private int reportImgId;
    private int reportId;
    private String reportImgName;

    @Override
    protected Serializable pkVal(){
        return this.reportImgId;
    }
}
