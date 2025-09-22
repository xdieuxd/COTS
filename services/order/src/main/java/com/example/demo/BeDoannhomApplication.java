package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo", "Controller", "Service", "Repository", "model"})
public class BeDoannhomApplication {
    public static void main(String[] args) {
        SpringApplication.run(BeDoannhomApplication.class, args);
    }
}
