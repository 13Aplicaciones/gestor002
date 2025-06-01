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

import com.aplicaciones13.gestor.payload.request.RolRequest;
import com.aplicaciones13.gestor.payload.response.RolResponse;
import com.aplicaciones13.gestor.services.RolService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Valid
@RestController
@RequestMapping("/api/roles")
@Tag(name = "Roles", description = "Servicio para CRUD de Roles")
public class RolController {

    private final RolService rolService;

    /**
     * Constructor de RolController.
     * 
     * @param rolService
     */
    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<RolResponse> getRolByName(@PathVariable String name) {
        RolResponse response = rolService.findByName(name);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RolResponse> crearRol(@RequestBody @Valid RolRequest request) {
        RolResponse response = rolService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{name}")
    public ResponseEntity<RolResponse> actualizarRol(
            @PathVariable String name,
            @RequestBody @Valid RolRequest request) {
        RolResponse response = rolService.update(name, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Void> eliminarRol(@PathVariable String name) {
        rolService.delete(name);
        return ResponseEntity.noContent().build();
    }
}
