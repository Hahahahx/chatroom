package com.ux.mapper.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ChatroomTemporary extends Model<ChatroomTemporary> {

    @TableId("temporary_id")
    private int TemporaryId;
    private String  TemporaryUserPhone;
    private String  TemporaryFrom;
    private boolean  TemporaryGroup;
    private Date TemporaryUpdatetime;

    @TableField(exist = false)
    private Object from;

    public Object getFrom(){
        if(this.TemporaryGroup){
            ChatroomGroup group = new ChatroomGroup();
            return group.selectById(this.TemporaryFrom);
        }else {
            ChatroomUser user = new ChatroomUser();
            Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                    .eq("user_phone",this.TemporaryFrom);
            return user.selectOne(wrapper).setUserRealname(null).setUserPassword(null);
        }
    }

    @Override
    protected Serializable pkVal(){
        return this.TemporaryId;
    }
}
