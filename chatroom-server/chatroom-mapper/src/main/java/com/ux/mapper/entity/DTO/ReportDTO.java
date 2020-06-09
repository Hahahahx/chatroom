package com.ux.mapper.entity.DTO;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.ChatroomReport;
import com.ux.mapper.entity.ChatroomReportImg;
import com.ux.mapper.entity.ChatroomUser;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("chatroom_report")
public class ReportDTO extends Model<ReportDTO> {

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

    @TableField(exist = false)
    private ChatroomUser from;
    @TableField(exist = false)
    private Object to;
    @TableField(exist = false)
    private List<ChatroomReportImg> img;

    public List<ChatroomReportImg> getImg(){
        ChatroomReportImg img = new ChatroomReportImg();
        Wrapper<ChatroomReportImg> wrapper = new QueryWrapper<ChatroomReportImg>()
                .eq("report_id",this.reportId);
        return img.selectList(wrapper);
    }

    public ChatroomUser getFrom(){
        ChatroomUser user = new ChatroomUser();
        return user.setUserId(this.reportFrom).selectById();
    }
    public Object getTo(){
        System.out.println(this.reportIsgroup);
        if(this.reportIsgroup){
            return new ChatroomGroup().setGroupId(this.reportTo).selectById();
        }else{
            return new ChatroomUser().setUserId(this.reportTo).selectById();
        }
    }


    @Override
    protected Serializable pkVal(){
        return this.reportId;
    }
}
