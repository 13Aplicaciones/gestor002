package com.aplicaciones13.keycloak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplicaciones13.keycloak.model.User;
import com.aplicaciones13.keycloak.services.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
    
    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        userService.createUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUser(@PathVariable String userId, @RequestBody User user) {
        userService.updateUser(userId, user);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{userId}/password")
    public ResponseEntity<Void> setPassword(
            @PathVariable String userId, 
            @RequestBody Map<String, Object> passwordInfo) {
        
        String password = (String) passwordInfo.get("password");
        boolean temporary = (boolean) passwordInfo.getOrDefault("temporary", false);
        
        userService.setPassword(userId, password, temporary);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{userId}/groups/{groupId}")
    public ResponseEntity<Void> addUserToGroup(
            @PathVariable String userId,
            @PathVariable String groupId) {
        
        userService.addUserToGroup(userId, groupId);
        return ResponseEntity.ok().build();
    }
}