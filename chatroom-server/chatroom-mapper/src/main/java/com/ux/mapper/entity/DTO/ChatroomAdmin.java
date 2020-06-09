package com.ux.mapper.entity.DTO;

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
public class ChatroomAdmin extends Model<ChatroomAdmin> {

    @TableId("admin_id")
    private int adminId;
    private String adminName;
    private String adminUsername;
    private String adminPassword;


    @Override
    protected Serializable pkVal(){
        return this.adminId;
    }
}
