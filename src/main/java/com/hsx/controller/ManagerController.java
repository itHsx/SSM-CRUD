package com.hsx.controller;

import com.hsx.pojo.Manager;
import com.hsx.service.EmployeeService;
import com.hsx.service.ManagerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class ManagerController {

    @Resource(name = "employeeServiceImpl")
    EmployeeService employeeService;

    @Resource(name = "managerServiceImpl")
    ManagerService managerService;

    @RequestMapping("/login")
    public ModelAndView login(String username, String password, ModelAndView modelAndView, HttpSession httpSession) {

        Manager manager = managerService.login(username, password);

        if (manager != null) {
            httpSession.setAttribute("manager", manager);
            modelAndView.setViewName("success");
            return modelAndView;
        } else {
            modelAndView.addObject("msg", "登录失败,请联系管理员");
            modelAndView.setViewName("index");
            return modelAndView;
        }
    }

}
