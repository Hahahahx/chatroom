package com.ux.service;

import com.ux.mapper.entity.DTO.ChatroomAdmin;

public interface AdminService {

    public ChatroomAdmin getAdminUser(String username, String password);


}
