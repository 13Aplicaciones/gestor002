package com.aplicaciones13.gestor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.payload.procesos.CreatePasswordRequest;
import com.aplicaciones13.gestor.payload.procesos.OperationsResponse;
import com.aplicaciones13.gestor.services.TokenService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/users/operaciones")
@Tag(name = "Users Operaciones", description = "Operaciones relacionadas con users")
public class UserOperacionesController {

    @Autowired
    TokenService tokenService;
    
    /**
     * Metodo para crear una clave de user
     * 
     * @param crearClaveRequest
     * @return
     */
    @PostMapping("crearClave")
    public ResponseEntity<?> crearPassword(@RequestBody @Valid CreatePasswordRequest crearClaveRequest) {        
        OperationsResponse operationsResponse = tokenService.crearPassword(crearClaveRequest);
        return ResponseEntity.status(operationsResponse.getCode()).body(operationsResponse);
    }

    @PostMapping("resetearClave")
    public String resetearPassword(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("cambiarClave")
    public String cambiarPassword(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("bloquear")
    public String bloquear(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("desbloquear")
    public String desbloquear(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("sincronizar")
    public String sincronizar(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }
}
