package com.ux.service.DTO;

import com.ux.mapper.entity.ChatroomGroup;
import com.ux.mapper.entity.DTO.GroupUserListDTO;
import lombok.Data;

import java.util.List;

@Data
public class GroupList {
    private ChatroomGroup group;
    private List<GroupUserListDTO> groupList;
}
