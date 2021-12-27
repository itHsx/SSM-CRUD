package com.hsx.service.impl;

import com.hsx.mapper.DepartmentMapper;
import com.hsx.pojo.Department;
import com.hsx.service.DepartmentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Resource(name = "departmentMapper")
    private DepartmentMapper departmentMapper;

    @Override
    public List<Department> getDepartments() {
        return departmentMapper.selectByExample(null);
    }

}
