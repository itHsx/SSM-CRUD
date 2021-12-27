package com.hsx.interceptor;

import com.hsx.pojo.Manager;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        //逻辑：判断用户是否登录  本质：判断session中有没有manager
        HttpSession session = request.getSession();
        Manager manager = (Manager) session.getAttribute("manager");
        if (manager == null) {
            //没有登录
            response.sendRedirect(request.getContextPath() + "/login");
            return false;
        }
        //放行  访问目标资源
        return true;
    }
}
