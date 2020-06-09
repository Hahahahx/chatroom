package com.ux.service;

import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.DTO.UserGroupListDTO;
import com.ux.service.DTO.GroupList;

import java.util.List;

public interface GroupService {
    public int create(String name,String brief,String header,String phone) throws Exception;
    public GroupList add(int id,List<String> phoneList);
    public GroupList delete(int id,String phone);
    public void dissolve(int id);
    public boolean setRemark(int id,String phone,String remark);
    public boolean setStatus(int id,String phone,int status);
    public GroupList get(int id);
    public List<GroupList> getAll();
    public List<UserGroupListDTO> getGroupList(Object phone);
    public GroupList setGroupHeader(int id,String name);
    public void updateGroup(ChatroomGroup group);
    public void updateGroupStatus(int id,int status);
}