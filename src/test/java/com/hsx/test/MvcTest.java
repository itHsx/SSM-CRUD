//package com.hsx.test;

//import com.hsx.pojo.Employee;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mock.web.MockHttpServletRequest;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//import com.github.pagehelper.PageInfo;

///**
// * 使用Spring测试模块提供的测试请求功能，测试curd请求的正确性
// * Spring4测试的时候，需要servlet3.0的支持
// *
// * @author lfy
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@WebAppConfiguration
//@ContextConfiguration(locations = {"classpath:applicationContext.xml", "classpath:spring-mvc.xml"})
//public class MvcTest {
//    //传入Springmvc的ioc
//    @Autowired
//    WebApplicationContext context;
//    //虚拟mvc请求，获取到处理结果。
//    MockMvc mockMvc;
//
//    @Before
//    public void initMokcMvc() {
//        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
//    }
//
//}
