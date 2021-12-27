package com.hsx.service.impl;

import com.hsx.mapper.ManagerMapper;
import com.hsx.pojo.Manager;
import com.hsx.service.ManagerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Resource(name = "managerMapper")
    ManagerMapper managerMapper;

    @Override
    public Manager login(String username, String password) {
        Manager manager = managerMapper.login(username, password);
        return manager;
    }

}
