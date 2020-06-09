package com.ux.mapper.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * mybatis-plus配置类
 * @author ux
 * */

@EnableTransactionManagement        //开启事务支持
@Configuration
@MapperScan("com.ux.mapper.mapper")
public class MybatisPlusConfig {

    /**
     * 配置分页插件
     * */
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        return new PaginationInterceptor();
    }
}
