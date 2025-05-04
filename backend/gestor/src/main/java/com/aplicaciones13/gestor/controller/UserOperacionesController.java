package com.aplicaciones13.gestor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.services.TokenService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Clase controladora para las operaciones de user.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Valid
@RestController
@RequestMapping("/api/users/process")
@Tag(name = "Users Operaciones", description = "Operaciones relacionadas con users")
public class UserOperacionesController {

    @Autowired
    TokenService tokenService;

    @PostMapping("resetPassword")
    public String resetPassword(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("changePassword")
    public String changePassword(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("lock")
    public String lockUser(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("unlock")
    public String unlockUser(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("synchronize")
    public String synchronize(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }
}
