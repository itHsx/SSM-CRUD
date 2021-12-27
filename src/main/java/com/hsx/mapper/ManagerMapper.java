package com.hsx.mapper;

import com.hsx.pojo.Manager;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface ManagerMapper {

    @Select("select * from tb_manager where username=#{username} and password=#{password}")
    Manager login(@Param("username") String username, @Param("password") String password);

}

