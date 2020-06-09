package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.ChatroomNotice;
import com.ux.mapper.entity.DTO.NoticeGroupDTO;
import com.ux.mapper.entity.DTO.NoticeUserDTO;
import com.ux.mapper.mapper.ChatroomNoticeMapper;
import com.ux.service.NoticeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Resource
    ChatroomNoticeMapper chatroomNoticeMapper;

    @Override
    public void addNotice(String phone, String from, String content, int status, boolean read) {
        ChatroomNotice chatroomNotice = new ChatroomNotice();
        chatroomNotice.setNoticeUserPhone(phone)
                .setNoticeFrom(from)
                .setNoticeContent(content)
                .setNoticeStatus(status)
                .setNoticeRead(read)
                .insert();
    }

    @Override
    public boolean deleteNotice(int id) {
        ChatroomNotice chatroomNotice = new ChatroomNotice();
        return chatroomNotice.setNoticeId(id).deleteById();
    }

    @Override
    public int emptyNotice(String phone) {
        Wrapper<ChatroomNotice> wrapper = new QueryWrapper<ChatroomNotice>()
                .eq("notice_user_phone",phone);
        return chatroomNoticeMapper.delete(wrapper);
    }

    /**
     * 更新通知，只更新状态，同意或者拒绝
     * @param status    1同意，2拒绝
     * @return
     */
    @Override
    public int updateNoticeStatus(String phone, int status) {
        Wrapper<ChatroomNotice> wrapper = new QueryWrapper<ChatroomNotice>()
                .eq("notice_from",phone);
        List<ChatroomNotice> noticeList = chatroomNoticeMapper.selectList(wrapper);
        int i = 0;
        for(ChatroomNotice chatroomNotice : noticeList){
            int state = chatroomNotice.getNoticeStatus();
            if(state==0||state==-1){
                chatroomNotice.setNoticeStatus(status).updateById();
                i++;
            }
        }
        return i;
    }

    @Override
    public int updateNoticeRead(String phone) {
        Wrapper<ChatroomNotice> wrapper = new QueryWrapper<ChatroomNotice>()
                .eq("notice_user_phone",phone);
        List<ChatroomNotice> noticeList = chatroomNoticeMapper.selectList(wrapper);
        int i = 0;
        for(ChatroomNotice chatroomNotice : noticeList){
            if(!chatroomNotice.isNoticeRead()){
                chatroomNotice.setNoticeRead(true).updateById();
                i++;
            }
        }
        return i;
    }

    /**
     * 查询当前用户发出的请求通知和接收的请求通知
     * @param phone 当前用户手机
     * @return
     */
    @Override
    public List<NoticeUserDTO> getUserNotice(String phone) {
        return chatroomNoticeMapper.selectUserNotice(phone);
    }


    /**
     * 查询当前用户发出的请求通知和接收的请求通知
     * @param phone 当前用户手机
     * @return
     */
    @Override
    public List<NoticeGroupDTO> getGroupNotice(String phone) {
        return chatroomNoticeMapper.selectGroupNotice(phone);
    }
}
