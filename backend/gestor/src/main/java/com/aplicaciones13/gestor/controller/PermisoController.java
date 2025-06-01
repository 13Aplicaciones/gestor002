package com.aplicaciones13.gestor.controller;


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

import com.aplicaciones13.gestor.payload.request.PermissionRequest;
import com.aplicaciones13.gestor.payload.response.PermissionResponse;
import com.aplicaciones13.gestor.services.PermissionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Valid
@RestController
@RequestMapping("/api/permisos")
@Tag(name = "Permisos", description = "Servicio para CRUD de Permisos")
public class PermisoController {

    private final PermissionService permisoService;

    /**
     * Constructor de PermisoController.
     *
     * @param permisoService Servicio de permisos
     */
    public PermisoController(PermissionService permisoService) {
        this.permisoService = permisoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PermissionResponse> getPermisoById(@PathVariable Long id) {
        PermissionResponse response = permisoService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<PermissionResponse> crearPermiso(@RequestBody @Valid PermissionRequest request) {
        PermissionResponse response = permisoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PermissionResponse> actualizarPermiso(
            @PathVariable Long id,
            @RequestBody @Valid PermissionRequest request) {
        PermissionResponse response = permisoService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPermiso(@PathVariable Long id) {
        permisoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}