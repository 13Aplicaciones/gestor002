package com.aplicaciones13.gestor.controller;

import com.aplicaciones13.gestor.payload.request.RolUsuarioRequest;
import com.aplicaciones13.gestor.payload.response.RolUsuarioResponse;
import com.aplicaciones13.gestor.services.RolUsuarioService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Valid
@RestController
@RequestMapping("/api/roles-usuario")
@Tag(name = "Roles de Usuario", description = "Servicio para CRUD de Roles de Usuario")
public class RolUsuarioController {

    @Autowired
    private RolUsuarioService rolUsuarioService;

    @GetMapping("/{idRolUsuario}")
    public ResponseEntity<RolUsuarioResponse> getRolUsuarioById(@PathVariable Long idRolUsuario) {
        RolUsuarioResponse response = rolUsuarioService.findById(idRolUsuario);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RolUsuarioResponse> crearRolUsuario(@RequestBody @Valid RolUsuarioRequest request) {
        RolUsuarioResponse response = rolUsuarioService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{idRolUsuario}")
    public ResponseEntity<RolUsuarioResponse> actualizarRolUsuario(
            @PathVariable Long idRolUsuario,
            @RequestBody @Valid RolUsuarioRequest request) {
        RolUsuarioResponse response = rolUsuarioService.update(idRolUsuario, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{idRolUsuario}")
    public ResponseEntity<Void> eliminarRolUsuario(@PathVariable Long idRolUsuario) {
        rolUsuarioService.delete(idRolUsuario);
        return ResponseEntity.noContent().build();
    }
}