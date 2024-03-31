package com.kinga.tasksservice;

import com.kinga.tasksservice.service.ParameService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;
import java.text.ParseException;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) throws ParseException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);
        ParameService parameService = (ParameService) ctx.getBean(ParameService.class);
        try {
            parameService.initalizeData();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
