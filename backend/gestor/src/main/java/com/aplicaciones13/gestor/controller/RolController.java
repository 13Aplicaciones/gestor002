package com.aplicaciones13.gestor_ws.controller;

import com.aplicaciones13.gestor_ws.payload.request.RolRequest;
import com.aplicaciones13.gestor_ws.payload.response.RolResponse;
import com.aplicaciones13.gestor_ws.services.RolService;

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
@RequestMapping("/api/roles")
@Tag(name = "Roles", description = "Servicio para CRUD de Roles")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping("/{nombre}")
    public ResponseEntity<RolResponse> getRolByNombre(@PathVariable String nombre) {
        RolResponse response = rolService.findByNombre(nombre);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RolResponse> crearRol(@RequestBody @Valid RolRequest request) {
        RolResponse response = rolService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{nombre}")
    public ResponseEntity<RolResponse> actualizarRol(
            @PathVariable String nombre,
            @RequestBody @Valid RolRequest request) {
        RolResponse response = rolService.update(nombre, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<Void> eliminarRol(@PathVariable String nombre) {
        rolService.delete(nombre);
        return ResponseEntity.noContent().build();
    }
}
