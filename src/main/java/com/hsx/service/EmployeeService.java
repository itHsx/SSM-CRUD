package com.hsx.service;

import com.hsx.pojo.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EmployeeService {

    /**
     * 查询所有员工数据
     *
     * @return
     */
    List<Employee> getEmployees();

    /**
     * 员工保存
     *
     * @param employee
     */
    void saveEmployee(Employee employee);

    /**
     * 判断用户名和邮箱是否重复
     *
     * @param email
     * @return
     */
    Boolean checkEmail(String email);

    /**
     * 根据id查询员工信息
     *
     * @param empId
     * @return
     */
    Employee getEmployeeById(Integer empId);

    /**
     * 修改员工信息
     *
     * @param employee
     */
    void updateEmployee(Employee employee);

    /**
     * 根据empId删除员工信息
     *
     * @param empId
     */
    void deleteEmployeeById(Integer empId);

    /**
     *批量删除员工信息
     * @param empIdList
     */
    void deleteEmployeeBatch(List<Integer> empIdList);

}
