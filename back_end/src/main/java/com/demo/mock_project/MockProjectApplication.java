package com.demo.mock_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MockProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(MockProjectApplication.class, args);
    }

}
