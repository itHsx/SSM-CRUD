 :shipit: 

# SSM_CRUD

基于Maven+SpringMVC+Spring+MyBatis+Thymeleaf+Bootstrap的组合

快速开发一个完整的CRUD --> 

用Thymeleaf实现前后分离,并且全部功能使用Ajax操作

除过对框架组合的基本使用外，还涉及到许多的开发方面的细节

如：Bootstrap 搭建页面，jQuery 的前端校验，MyBatis 逆向工程使用，Rest 风格的 URI,
@ResponseBody 注解完成 AJAX，AJAX 发送 PUT 请求的问题，Thymeleaf实现前后分离 JSR303 的后端校验等

所有Ajax请求都在webapp/static/js/list.js下

使用SpringMvc加了一个简单的拦截器实现拦截非Manager登录业务，需要从数据库查询tb_manager表


---------------------------此项目用于熟练使用 SSM 三大框架---------------------------
