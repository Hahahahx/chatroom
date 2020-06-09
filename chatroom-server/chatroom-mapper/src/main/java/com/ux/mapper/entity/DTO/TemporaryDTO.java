package com.ux.mapper.entity.DTO;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.ChatroomUser;
import com.ux.mapper.mapper.ChatroomGroupMapper;
import com.ux.mapper.mapper.ChatroomUserMapper;
import lombok.Data;

import javax.annotation.Resource;
import java.util.Date;

@Data
public class TemporaryDTO {

    private int TemporaryId;
    private String  TemporaryUserPhone;
    private String  TemporaryFrom;
    private boolean  TemporaryGroup;
    private Date TemporaryUpdatetime;
    private Object Information;

    public Object getInformation(){
        if(isTemporaryGroup()){
            Wrapper<ChatroomGroup> wrapper = new QueryWrapper<ChatroomGroup>()
                    .eq("group_id",TemporaryFrom);
            return new ChatroomGroup().selectOne(wrapper);
        }else {
            Wrapper<ChatroomUser> wrapper = new QueryWrapper<ChatroomUser>()
                    .eq("user_phone",TemporaryFrom);
            return new ChatroomUser().selectOne(wrapper);
        }
    }
}
