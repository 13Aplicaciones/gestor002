package com.aplicaciones13.gestor.controller;


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

import com.aplicaciones13.gestor.payload.request.PermisoRequest;
import com.aplicaciones13.gestor.payload.response.PermisoResponse;
import com.aplicaciones13.gestor.services.PermisoService;

@Valid
@RestController
@RequestMapping("/api/permisos")
@Tag(name = "Permisos", description = "Servicio para CRUD de Permisos")
public class PermisoController {

    @Autowired
    private PermisoService permisoService;

    @GetMapping("/{id}")
    public ResponseEntity<PermisoResponse> getPermisoById(@PathVariable Long id) {
        PermisoResponse response = permisoService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<PermisoResponse> crearPermiso(@RequestBody @Valid PermisoRequest request) {
        PermisoResponse response = permisoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PermisoResponse> actualizarPermiso(
            @PathVariable Long id,
            @RequestBody @Valid PermisoRequest request) {
        PermisoResponse response = permisoService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPermiso(@PathVariable Long id) {
        permisoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}