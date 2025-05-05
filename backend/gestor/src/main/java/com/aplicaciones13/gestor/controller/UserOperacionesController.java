package com.aplicaciones13.gestor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.payload.procesos.ChangePasswordRequest;
import com.aplicaciones13.gestor.services.TokenService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

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
        
        return entity;
    }

    @Operation(summary = "Cambiar Password", description = "Cambiar Password")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Cambiar password de usuario", content = @Content(schema = @Schema(implementation = ChangePasswordRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cambio de contraseña exitoso"),
    })
    @PostMapping("changePassword")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        tokenService.changePassword(changePasswordRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("lock")
    public String lockUser(@Valid @RequestBody String entity) {
        
        return entity;
    }

    @PostMapping("unlock")
    public String unlockUser(@Valid @RequestBody String entity) {
        
        return entity;
    }

    @PostMapping("synchronize")
    public String synchronize(@Valid @RequestBody String entity) {
        
        return entity;
    }
}
