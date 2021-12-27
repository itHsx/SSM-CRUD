package com.hsx.service.impl;

import com.hsx.mapper.EmployeeMapper;
import com.hsx.pojo.Employee;
import com.hsx.pojo.EmployeeExample;
import com.hsx.service.EmployeeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * EmployeeService的实现类
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Resource(name = "employeeMapper")
    EmployeeMapper employeeMapper;

    /**
     * 查询所有员工数据
     *
     * @return
     */
    @Override
    public List<Employee> getEmployees() {
        return employeeMapper.selectByExampleWithDept(null);
    }

    /**
     * 员工保存
     *
     * @param employee
     */
    @Override
    public void saveEmployee(Employee employee) {
        employeeMapper.insertSelective(employee);
    }

    /**
     * 判断用户名和邮箱是否重复
     *
     * @param email
     * @return count == 0:表示数据库中没有该记录-->可用
     */
    @Override
    public Boolean checkEmail(String email) {

        //创建EmployeeExample对象
        EmployeeExample employeeExample = new EmployeeExample();
        //创建Criteria对象
        EmployeeExample.Criteria criteria = employeeExample.createCriteria();
        //将email放入criteria的andEmailEqualTo方法中
        criteria.andEmailEqualTo(email);
        //查询
        long count = employeeMapper.countByExample(employeeExample);

        return count == 0;

    }

    /**
     * 根据id查询员工信息
     *
     * @param empId
     * @return
     */
    @Override
    public Employee getEmployeeById(Integer empId) {
        return employeeMapper.selectByPrimaryKeyWithDept(empId);
    }

    /**
     * 修改员工信息
     *
     * @param employee
     */
    @Override
    public void updateEmployee(Employee employee) {
        employeeMapper.updateByPrimaryKeySelective(employee);
    }

    /**
     * 根据empId删除员工信息
     *
     * @param empId
     */
    @Override
    public void deleteEmployeeById(Integer empId) {
        employeeMapper.deleteByPrimaryKey(empId);
    }

    /**
     * 批量删除员工信息
     * @param empIdList
     */
    @Override
    public void deleteEmployeeBatch(List<Integer> empIdList) {

        //创建EmployeeExample对象
        EmployeeExample employeeExample = new EmployeeExample();

        //创建EmployeeExample.Criteria 用于装条件
        EmployeeExample.Criteria criteria = employeeExample.createCriteria();
        criteria.andEmpIdIn(empIdList); //empId在empIdList集合中

        //有条件的删除
        employeeMapper.deleteByExample(employeeExample);

    }

}
