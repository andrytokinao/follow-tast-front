package com.kinga.followtask.web;


import com.kinga.followtask.entity.UserApp;
import com.kinga.followtask.service.UserService;
import com.kinga.utils.KingaUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;


@Controller
public class GQUserController {
    private static final Logger logger = LoggerFactory.getLogger(GQUserController.class);
    @Autowired
    UserService userService;

    @QueryMapping
    public UserApp getUser(@Argument String username){
        return userService.findByUsernamOrContactOrCinOrEmail(username);
    }
    @MutationMapping
    public UserApp saveUser(@Argument UserApp userApp){
       return userService.save(userApp);
    }
    @QueryMapping
    public List<UserApp> allUsers(){
       return userService.findAll();
    }
    @GetMapping({"/", "/public/**", "/private/**"})
    public String publicRedirection(){
        logger.info("loading page frontend  ");
        return "/index.html";
    }
    @PostMapping("/api/upload/photo")
    public ResponseEntity<String> uploadFile(@RequestPart("file") MultipartFile file, @RequestParam String userId) {
        return userService.addPhoto(file, userId);
    }

}
