package com.aplicaciones13.gestor.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.payload.request.PermissionsRequest;
import com.aplicaciones13.gestor.payload.response.PermissionsResponse;
import com.aplicaciones13.gestor.services.PermissionsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;


@Validated
@RestController
@RequestMapping("/api/permissions")
@Tag(name = "Permissions", description = "Servicio para CRUD de Permisos")
public class PermissionsController {

    private final PermissionsService permissionsService;

    /**
     * Constructor de PermissionsController.
     * 
     * @param permissionsService
     */
    public PermissionsController(PermissionsService permissionsService) {
        this.permissionsService = permissionsService;
    }

    /**
     * Metodo para obtener un permiso por su UUID.
     * 
     * @param uuid
     * @return
     */
    @Operation(summary = "Obtener permiso por UUID", description = "Obtiene un permiso por su UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Permiso encontrado",
                    content = @Content(schema = @Schema(implementation = PermissionsResponse.class)))
    })
    @GetMapping("/{uuid}")
    public ResponseEntity<PermissionsResponse> getPermissionsById(@PathVariable @ValidUUID String uuid) {
        PermissionsResponse response = permissionsService.findByUuid(uuid);
        return ResponseEntity.ok(response);
    }

   
    /**
     * Metodo para crear un permiso.
     * 
     * @param request
     * @return
     */
    /* 
    @Operation(summary = "Crea un Permiso", description = "Crea un permiso")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Permiso a crear", content = @Content(schema = @Schema(implementation = PermissionsRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Permiso", content = @Content(schema = @Schema(implementation = PermissionsResponse.class))),
    })
    @PostMapping
    public ResponseEntity<PermissionsResponse> createPermissions(@RequestBody @Validated PermissionsRequest request) {
        PermissionsResponse response = permissionsService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
        */

    /**
     * Metodo para actualizar un permiso.
     * 
     * @param id
     * @param request
     * @return
     */
    @Operation(summary = "Actualiza un Permiso", description = "Actualiza un permiso")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Permiso a actualizar", content = @Content(schema = @Schema(implementation = PermissionsRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Permiso actualizado", content = @Content(schema = @Schema(implementation = PermissionsResponse.class)))
    })
    @PutMapping("/{uuid}")
    public ResponseEntity<PermissionsResponse> updatePermissions(
        @PathVariable String uuid, 
        @RequestBody @Validated PermissionsRequest request
        ) {
        PermissionsResponse response = permissionsService.update(uuid, request);
        return ResponseEntity.ok(response);
    }

    /* 
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePermissions(@PathVariable Long id) {
        permissionsService.delete(id);
        return ResponseEntity.noContent().build();
    }
    */
}