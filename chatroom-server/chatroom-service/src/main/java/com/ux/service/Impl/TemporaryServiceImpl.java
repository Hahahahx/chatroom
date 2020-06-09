package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.ChatroomTemporary;
import com.ux.mapper.entity.DTO.TemporaryDTO;
import com.ux.mapper.mapper.ChatroomTemporaryMapper;
import com.ux.service.TemporaryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class TemporaryServiceImpl implements TemporaryService {

    @Resource
    ChatroomTemporaryMapper temporaryMapper;

    @Override
    public List<TemporaryDTO> setTemporary(String userPhone, String fromPhone, boolean isGroup) {
        Wrapper<ChatroomTemporary> wrapper = new QueryWrapper<ChatroomTemporary>()
                .eq("temporary_user_phone",userPhone)
                .eq("temporary_from",fromPhone);
        ChatroomTemporary temporary = temporaryMapper.selectOne(wrapper);
        if(temporary == null){
            temporary = new ChatroomTemporary();
            temporary.setTemporaryUserPhone(userPhone)
                    .setTemporaryFrom(fromPhone)
                    .setTemporaryGroup(isGroup)
                    .insert();
        }else {
            temporary.setTemporaryUpdatetime(new Date()).updateById();
        }
        return temporaryMapper.selectTemporaryList(userPhone);
    }

    @Override
    public void deleteTemporary(int id) {
        temporaryMapper.deleteById(id);
    }

    @Override
    public void deleteTemporary(String phone1, String phone2) {
        Wrapper<ChatroomTemporary> wrapper = new QueryWrapper<ChatroomTemporary>()
                .eq("temporary_user_phone",phone1).eq("temporary_from",phone2)
                .or()
                .eq("temporary_user_phone",phone2).eq("temporary_from",phone1);
        temporaryMapper.delete(wrapper);
    }

    @Override
    public List<TemporaryDTO> getTemporary(String userPhone) {
        return temporaryMapper.selectTemporaryList(userPhone);
    }
}
