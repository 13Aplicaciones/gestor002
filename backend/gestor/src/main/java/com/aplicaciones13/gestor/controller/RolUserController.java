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

import com.aplicaciones13.gestor.payload.request.RolUserRequest;
import com.aplicaciones13.gestor.payload.response.RolUserResponse;
import com.aplicaciones13.gestor.services.RolUserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Valid
@RestController
@RequestMapping("/api/roles-user")
@Tag(name = "Roles de user", description = "Servicio para CRUD de Roles de user")
public class RolUserController {

    private final RolUserService rolUserService;

    /**
     * Constructor de RolUserController.
     * 
     * @param rolUserService
     */
    public RolUserController(RolUserService rolUserService) {
        this.rolUserService = rolUserService;
    }

    @GetMapping("/{idRolUser}")
    public ResponseEntity<RolUserResponse> getRolUserById(@PathVariable Long idRolUser) {
        RolUserResponse response = rolUserService.findById(idRolUser);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RolUserResponse> crearRolUser(@RequestBody @Valid RolUserRequest request) {
        RolUserResponse response = rolUserService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{idRolUser}")
    public ResponseEntity<RolUserResponse> actualizarRolUser(
            @PathVariable Long idRolUser,
            @RequestBody @Valid RolUserRequest request) {
        RolUserResponse response = rolUserService.update(idRolUser, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{idRolUser}")
    public ResponseEntity<Void> eliminarRolUser(@PathVariable Long idRolUser) {
        rolUserService.delete(idRolUser);
        return ResponseEntity.noContent().build();
    }
}