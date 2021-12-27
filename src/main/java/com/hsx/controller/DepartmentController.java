package com.hsx.controller;

import com.hsx.pojo.Department;
import com.hsx.pojo.Msg;
import com.hsx.service.DepartmentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 处理与部门有关的请求
 */
@Controller
public class DepartmentController {

    @Resource(name = "departmentServiceImpl")
    private DepartmentService departmentService;

    /**
     * 查询所有部门
     * @return
     */
    @RequestMapping("/department")
    @ResponseBody
    public Msg getDepartments() {
        List<Department> departments = departmentService.getDepartments();
        return Msg.success().add("departments", departments);
    }

}
