package com.aplicaciones13.gestor.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.payload.procesos.ChangePasswordRequest;
import com.aplicaciones13.gestor.payload.procesos.LockRequest;
import com.aplicaciones13.gestor.payload.procesos.ResetPasswordRequest;
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
public class UserProcessController {

    private final TokenService tokenService;

    public UserProcessController( TokenService tokenService) {
        this.tokenService = tokenService;
    }

    /**
     * Restablece la contraseña del usuario.
     * 
     * @param resetPasswordRequest
     * @return
     */
    @Operation(summary = "Reset Password", description = "Restablecer la contraseña del usuario")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Restablecer la contraseña del usuario", content = @Content(schema = @Schema(implementation = ResetPasswordRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cambio de contraseña exitoso"),
    })
    @PostMapping("resetPassword")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        tokenService.resetPassword(resetPasswordRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    /**
     * Cambia la contraseña del usuario.
     * 
     * @param changePasswordRequest
     * @return
     */
    @Operation(summary = "Cambiar Password", description = "Cambiar Password")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Cambiar password de usuario", content = @Content(schema = @Schema(implementation = ChangePasswordRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cambio de contraseña exitoso"),
    })
    @PostMapping("changePassword")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        tokenService.changePassword(changePasswordRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    /**
     * Bloquea o desbloquea un usuario.
     * 
     * @param lockRequest
     * @return
     */
    @Operation(summary = "Bloquear Usuario", description = "Bloquear un usuario")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Bloquear usuario", content = @Content(schema = @Schema(implementation = LockRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuario bloqueado exitosamente"),
    })
    @PostMapping("lock")
    public ResponseEntity<Void> lockUser(@Valid @RequestBody LockRequest lockRequest) {
        tokenService.lockUser(lockRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    /**
     * Desbloquea un usuario.
     * 
     * @param lockRequest
     * @return
     */
    @Operation(summary = "Desbloquear Usuario", description = "Desbloquear un usuario")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Desbloquear usuario", content = @Content(schema = @Schema(implementation = LockRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuario desbloqueado exitosamente"),
    })
    @PostMapping("unlock")
    public ResponseEntity<Void> unlockUser(@Valid @RequestBody LockRequest lockRequest) {
        tokenService.unlockUser(lockRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("synchronize")
    public String synchronize(@Valid @RequestBody String entity) {
        
        return entity;
    }
}
