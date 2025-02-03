package com.aplicaciones13.gestor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.payload.procesos.CrearClaveRequest;
import com.aplicaciones13.gestor.payload.procesos.OperacionesResponse;
import com.aplicaciones13.gestor.services.TokenService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Clase controladora para las operaciones de usuario.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Valid
@RestController
@RequestMapping("/api/usuarios/operaciones")
@Tag(name = "Usuarios Operaciones", description = "Operaciones relacionadas con usuarios")
public class UsuarioOperacionesController {

    @Autowired
    TokenService tokenService;
    
    /**
     * Metodo para crear una clave de usuario
     * 
     * @param crearClaveRequest
     * @return
     */
    @PostMapping("crearClave")
    public ResponseEntity<?> crearClave(@RequestBody @Valid CrearClaveRequest crearClaveRequest) {        
        OperacionesResponse operacionesResponse = tokenService.crearClave(crearClaveRequest);
        return ResponseEntity.status(operacionesResponse.getCode()).body(operacionesResponse);
    }

    @PostMapping("resetearClave")
    public String resetearClave(@Valid @RequestBody String entity) {
        //TODO: process POST request
        return entity;
    }

    @PostMapping("cambiarClave")
    public String cambiarClave(@Valid @RequestBody String entity) {
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
