package com.ux.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginHandlerInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 通过Request对象获取上次服务器端发送的Cookie信息
        Cookie[] cookies = request.getCookies();
        HttpSession session = request.getSession();

        if(cookies != null){                     // 判断Request对象中的Cookie是否存在
            for(Cookie cookie:cookies){                 // 遍历Request对象中的所有Cookie
                String name = cookie.getName();          // 获取每一个Cookie的名称
                if(name.equals("admin_user")){        // 判断Cookie的名称是否存在是id
                    return true;            //放行登录
                }
            }
        }else {
            if(session.getAttribute("admin_user")!= null){
                return true;
            }
        }

        request.getRequestDispatcher("/login.html").forward(request,response);
        return false;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
