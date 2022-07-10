package com.demo.mock_project.config;

import java.sql.Timestamp;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DateConfig {
    @Bean
    public static Timestamp getTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }
}