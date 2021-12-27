package com.hsx.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hsx.pojo.Employee;
import com.hsx.pojo.Msg;
import com.hsx.service.EmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 处理和员工有关的请求
 */
@Controller
public class EmployeeController {

    @Resource(name = "employeeServiceImpl")
    EmployeeService employeeService;

    /**
     * 分页查询所有员工信息
     * 以json的形式直接返回给客户端
     *
     * @param pageNumber
     * @return
     */
    @RequestMapping(value = "/employee", method = RequestMethod.GET)
    @ResponseBody
    public Msg getEmployeesWithJson(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) Integer pageNumber) {

        //引入PageHelper
        //在查询之前调用
        PageHelper.startPage(pageNumber, 7);

        //调用service查询所有员工数据  跟在PageHelper后的查询就是一个分页查询
        List<Employee> employees = employeeService.getEmployees();

        //用pageInfo对结果进行包装  7:下面连续显示的页数为7
        PageInfo pageInfo = new PageInfo(employees, 7);

        //将pageInfo放入Msg的add方法中并返回
        return Msg.success().add("pageInfo", pageInfo);

    }

    /**
     * 根据id查询员工信息
     *
     * @return
     */
    @RequestMapping(value = "/employee/{empId}", method = RequestMethod.GET)
    @ResponseBody
    public Msg getEmployeeById(@PathVariable(value = "empId") Integer empId) {
        Employee employee = employeeService.getEmployeeById(empId);
        return Msg.success().add("employee", employee);
    }

    /**
     * 保存员工信息
     * 1.需要支持JSR303后端数据校验
     *
     * @return
     * @Valid：表示需要校验 和 BindingResult bindingResult：返回的校验信息
     */
    @RequestMapping(value = "employee", method = RequestMethod.POST)
    @ResponseBody
    public Msg saveEmployee(@Valid Employee employee, BindingResult bindingResult) {
        //校验失败
        if (bindingResult.hasErrors()) {
            //创建错误信息的Map集合
            Map<String, Object> errorMap = new HashMap<String, Object>();
            //后端校验失败 返回信息
            List<FieldError> fieldErrors = bindingResult.getFieldErrors(); //所有错误信息
            for (FieldError fieldError : fieldErrors) {
                //把每一个错误信息存到错误信息的Map集合
                //fieldError.getField()错误的字段名；fieldError.getDefaultMessage()错误信息
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            //返回给客户端
            return Msg.fail().add("errorMap", errorMap);
        } else { //校验成功
            employeeService.saveEmployee(employee);
            //返回成功
            return Msg.success();
        }
    }

    /**
     * 修改员工信息
     *
     * @param employee
     * @return
     */
    @RequestMapping(value = "/employee/{empId}", method = RequestMethod.PUT)
    @ResponseBody
    public Msg updateEmployeeById(Employee employee) {
        employeeService.updateEmployee(employee);
        return Msg.success();
    }

    /**
     * 根据empId删除员工信息
     * 单个empId+批量empId
     *
     * @param empIds
     * @return
     */
    @RequestMapping(value = "/employee/{empId}", method = RequestMethod.DELETE)
    @ResponseBody
    public Msg deleteEmployeeById(@PathVariable(value = "empId") String empIds) {

        //如果empIds中包含-，则是批量删除
        if (empIds.contains("-")) {
            //创建list集合
            List<Integer> empIdList = new ArrayList<Integer>();
            //分割字符串 得到字符串empId数组(strings)
            String[] strings = empIds.split("-");
            //遍历字符串empId数组(strings) 得到每一个empId
            for (String string : strings) {
                //转换成Integer
                Integer empId = Integer.parseInt(string);
                //把转换好的empId添加进list集合
                empIdList.add(empId);
                //调用Service进行批量删除业务
                employeeService.deleteEmployeeBatch(empIdList);
            }
        } else {  //否则是单个删除
            Integer empId = Integer.parseInt(empIds);
            employeeService.deleteEmployeeById(empId);
        }
        return Msg.success();
    }

    /**
     * 验证邮箱是否重复
     *
     * @param email
     * @return
     */
    @RequestMapping("/checkEmail")
    @ResponseBody
    public Msg checkEmail(@RequestParam(value = "email") String email) {
        Boolean flag = employeeService.checkEmail(email);
        if (flag) {
            return Msg.success();
        } else {
            return Msg.fail();
        }
    }

}
