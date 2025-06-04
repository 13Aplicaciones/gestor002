package com.aplicaciones13.keycloak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplicaciones13.keycloak.model.User;
import com.aplicaciones13.keycloak.services.UserService;

import java.util.List;
import java.util.Map;

//TODO valirar seguridades de token
//TODO agregar OpenAPI
/**
 * 
 * Controlador para administrar usuarios.
 * 
 * @author omargo33
 * @since 2025-03-31
 * 
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Metodo para obtener todos los usuarios.
     * 
     * @return
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    /**
     * Metodo para obtener la informacion de un unico usuario.
     * 
     * @param userId
     * @return
     */
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
    
    /**
     * Metodo para crear usuario
     * 
     * @param user
     * @return
     */
    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        userService.createUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    /**
     * Metodo para actualizar la informacion de un usuario.
     * 
     * @param userId
     * @param user
     * @return
     */
    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUser(@PathVariable String userId, @RequestBody User user) {
        userService.updateUser(userId, user);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Metodo para borrar un usuario.
     * 
     * @param userId
     * @return
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Metodo para cambiar el password
     * 
     * @param userId
     * @param passwordInfo
     * @return
     */
    @PostMapping("/{userId}/password")
    public ResponseEntity<Void> setPassword(
            @PathVariable String userId, 
            @RequestBody Map<String, Object> passwordInfo) {
        
        String password = (String) passwordInfo.get("password");
        boolean temporary = (boolean) passwordInfo.getOrDefault("temporary", false);
        
        userService.setPassword(userId, password, temporary);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Metodo para agrear un usuario a un grupo.
     * 
     * @param userId
     * @param groupId
     * @return
     */
    @PostMapping("/{userId}/groups/{groupId}")
    public ResponseEntity<Void> addUserToGroup(
            @PathVariable String userId,
            @PathVariable String groupId) {
        
        userService.addUserToGroup(userId, groupId);
        return ResponseEntity.ok().build();
    }
}