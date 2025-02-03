package com.aplicaciones13.gestor.controller;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.validaciones.ValidUUID;
import com.aplicaciones13.gestor.payload.request.ModuloRequest;
import com.aplicaciones13.gestor.payload.response.ModuloListaResponse;
import com.aplicaciones13.gestor.payload.response.ModuloResponse;
import com.aplicaciones13.gestor.services.ModuloService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Controlador para el CRUD de Modulos
 * 
 * @author omargo33
 * @since 2025-01-25
 */
@Valid
@RestController
@RequestMapping("/api/modulos")
@Tag(name = "1.- Modulos", description = "Servicio para CRUD de Modulos")
public class ModuloController {

    @Autowired
    private ModuloService moduloService;

    /**
     * Metodo para obtener un modulo por su UUID.
     * 
     * @param uuid
     * @return
     */
    @Operation(summary = "Obtiene Modulo por UUID", description = "Devuelve un modulo por UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modulo", content = @Content(schema = @Schema(implementation = ModuloResponse.class))),
    })
    @GetMapping("/{uuid}")
    public ResponseEntity<ModuloResponse> getModuloByUuid(@PathVariable @ValidUUID String uuid) {
        ModuloResponse response = moduloService.findByUuid(uuid);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para crear un modulo.
     * 
     * @param request
     * @return
     */
    @Operation(summary = "Crea un Modulo", description = "Crea un modulo")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Modulo a crear", content = @Content(schema = @Schema(implementation = ModuloRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modulo", content = @Content(schema = @Schema(implementation = ModuloResponse.class))),
    })
    @PostMapping
    public ResponseEntity<ModuloResponse> crearModulo(@RequestBody @Valid ModuloRequest request) {
        ModuloResponse response = moduloService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Metodo para actualizar un modulo.
     * 
     * @param uuid
     * @param request
     * @return
     */
    @Operation(summary = "Actualiza un Modulo", description = "Actualiza un modulo")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Modulo a actualizar", content = @Content(schema = @Schema(implementation = ModuloRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modulo", content = @Content(schema = @Schema(implementation = ModuloResponse.class))),
    })
    @PutMapping("/{uuid}")
    public ResponseEntity<ModuloResponse> actualizarModulo(
            @PathVariable String uuid,
            @RequestBody @Valid ModuloRequest request) {
        return ResponseEntity.ok(moduloService.update(uuid, request));
    }

    /**
     * Metodo para borrar un modulo.
     * 
     * @param uuid
     * @param request
     * @return
     */
    @Operation(summary = "Borrar un Modulo", description = "Borra un modulo")
    @ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Modulo") })
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> eliminarModulo(@PathVariable String uuid) {
        moduloService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Metodo para obtener los modulos paginados.
     * 
     * @param page
     * @param size
     * @param sort
     * @param indice
     * @param nombre
     * @param estado
     * @return
     */
    @Operation(summary = "Obtiene Modulos de forma paginada", description = "Devuelve listado de Modulos que correspondan a la solicitud")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modulos paginados", content = @Content(schema = @Schema(implementation = ModuloResponse[].class))),
    })
    @GetMapping("/paginado")
    public Map<String, Object> paginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "indice,asc") String[] sort,
            @RequestParam(required = false) String indice,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String estado) {
        Page<ModuloResponse> pageModulos = moduloService.paginada(indice, nombre, estado,
                ControllerTools.generarOrders(page, size, sort));

        return ControllerTools.generarPiePage(pageModulos);
    }

    /**
     * Metodo para obtener todos los modulos.
     * 
     * @return
     */
    @Operation(summary = "Obtiene Lista de Modulos", description = "Devuelve listado de Modulos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modulos Listado corto", content = @Content(schema = @Schema(implementation = ModuloListaResponse[].class))),
    })
    @GetMapping("/listado")
    public ResponseEntity<?> listado() {
        return ResponseEntity.ok(moduloService.findAll());
    }
}