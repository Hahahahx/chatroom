/*
package com.ux.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

*/
/**
 * websocket配置类
 * 要注入ServerEndpointExporter，这个ean会自动注册使用了@ServerEndpoint注解声明的Websocketendpoint
 * @author ux
 * @date 19.09.07
 * *//*


@Configuration
public class WebSocketConfig {

    @Bean
    public ServerEndpointExporter serverEndpointExporter(){
        return new ServerEndpointExporter();
    }
}
*/
