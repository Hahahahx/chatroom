package com.ux.service;

import com.ux.mapper.entity.DTO.TemporaryDTO;

import java.util.List;

public interface TemporaryService {

    public List<TemporaryDTO> setTemporary(String userPhone, String fromPhone, boolean isGroup);
    public void deleteTemporary(int id);
    public void deleteTemporary(String phone1,String phone2);
    public List<TemporaryDTO> getTemporary(String userPhone);

}
