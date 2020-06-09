package com.ux.service.Impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.ChatroomGroupList;
import com.ux.mapper.entity.DTO.UserGroupListDTO;
import com.ux.mapper.mapper.ChatroomGroupListMapper;
import com.ux.mapper.mapper.ChatroomGroupMapper;
import com.ux.service.DTO.GroupList;
import com.ux.service.GroupService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.security.acl.Group;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {

    @Resource
    ChatroomGroupListMapper chatroomGroupListMapper;
    @Resource
    ChatroomGroupMapper chatroomGroupMapper;

    @Override
    public int create(String name, String brief, String header,String phone) throws Exception {
        ChatroomGroup group = chatroomGroupMapper.selectLastGroup();
        long code = group.getGroupCode()+1;
        group = new ChatroomGroup();
        group.setGroupName(name)
                .setGroupCreateUser(phone)
                .setGroupBrief(brief)
                .setGroupHeader(header)
                .setGroupCode(code)
                .insert();
        QueryWrapper<ChatroomGroup> wrapper = new QueryWrapper<ChatroomGroup>()
                .eq("group_code",code);

        return group.selectOne(wrapper).getGroupId();
    }

    @Override
    public GroupList add(int id, List<String> phoneList) {
        ChatroomGroupList groupList = new ChatroomGroupList();
        groupList.setGroupListGroupid(id);
        for (String phone : phoneList){
            groupList.setGroupListUserPhone(phone).insert();
        }

        GroupList list = new GroupList();
        list.setGroup(new ChatroomGroup().selectById(id));
        list.setGroupList(chatroomGroupListMapper.selectUserListFromGroup(id));
        return list;
    }

    @Override
    public GroupList delete(int id, String phone) {
        ChatroomGroupList groupList = new ChatroomGroupList();
        Wrapper<ChatroomGroupList> wrapper = new QueryWrapper<ChatroomGroupList>()
                .eq("group_list_groupid",id)
                .eq("group_list_user_phone",phone);
        groupList.delete(wrapper);

        GroupList list = new GroupList();
        list.setGroup(new ChatroomGroup().selectById(id));
        list.setGroupList(chatroomGroupListMapper.selectUserListFromGroup(id));
        return list;
    }

    @Override
    public void dissolve(int id) {
        chatroomGroupMapper.deleteById(id);
        Wrapper<ChatroomGroupList> wrapper = new QueryWrapper<ChatroomGroupList>()
                .eq("group_list_groupid",id);

        chatroomGroupListMapper.delete(wrapper);
        return ;
    }

    @Override
    public boolean setRemark(int id, String phone, String remark) {
        ChatroomGroupList groupList = new ChatroomGroupList();
        Wrapper<ChatroomGroupList> wrapper = new QueryWrapper<ChatroomGroupList>()
                .eq("group_list_groupid",id)
                .eq("group_list_user_phone",phone);

        return groupList
                .setGroupListGroupid(id)
                .setGroupListUserPhone(phone)
                .setGroupListUserRemark(remark)
                .update(wrapper);
    }

    @Override
    public boolean setStatus(int id, String phone,int status) {
        ChatroomGroupList groupList = new ChatroomGroupList();
        Wrapper<ChatroomGroupList> wrapper = new QueryWrapper<ChatroomGroupList>()
                .eq("group_list_groupid",id)
                .eq("group_list_user_phone",phone);

        return groupList
                .setGroupListGroupid(id)
                .setGroupListUserPhone(phone)
                .setGroupListUserStatus(status)
                .update(wrapper);
    }

    @Override
    public GroupList get(int id) {
        GroupList list = new GroupList();
        list.setGroup(new ChatroomGroup().selectById(id));
        list.setGroupList(chatroomGroupListMapper.selectUserListFromGroup(id));
        return list;
    }

    @Override
    public List<GroupList> getAll() {
        List<GroupList> list = new ArrayList<>();
        List<ChatroomGroup> groups = new ChatroomGroup().selectAll();
        for(ChatroomGroup group:groups){
            GroupList groupItem = new GroupList();
            groupItem.setGroup(group);
            groupItem.setGroupList(chatroomGroupListMapper.selectUserListFromGroup(group.getGroupId()));
            list.add(groupItem);
        }
        return list;
    }

    @Override
    public List<UserGroupListDTO> getGroupList(Object phone) {
        return chatroomGroupListMapper.selectGroupListFromUser(phone.toString());
    }

    @Override
    public GroupList setGroupHeader(int id, String name) {
        ChatroomGroup group = new ChatroomGroup();
        group.setGroupId(id)
                .setGroupHeader(name)
                .updateById();
        GroupList list = new GroupList();
        list.setGroup(new ChatroomGroup().selectById(id));
        list.setGroupList(chatroomGroupListMapper.selectUserListFromGroup(id));
        return list;
    }

    @Override
    public void updateGroup(ChatroomGroup group) {
        group.updateById();
    }

    @Override
    public void updateGroupStatus(int id, int status) {
        ChatroomGroup group = new ChatroomGroup().selectById(id);
        group.setGroupStatus(status).updateById();
    }
}