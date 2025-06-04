package com.aplicaciones13.gestor.controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.payload.request.ModuleRequest;
import com.aplicaciones13.gestor.payload.response.ModuleListaResponse;
import com.aplicaciones13.gestor.payload.response.ModuleResponse;
import com.aplicaciones13.gestor.services.ModuleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * Controlador para el CRUD de Modules
 * 
 * @author omargo33
 * @since 2025-01-25
 */
@Valid
@RestController
@RequestMapping("/api/modules")
@Tag(name = "Modules", description = "Servicio para CRUD de Modules")
public class ModuleController {
    
    private final ModuleService moduleService;

    /**
     * Constructor de ModuleController.
     * 
     * @param moduleService
     */
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    /**
     * Metodo para obtener un module por su UUID.
     * 
     * @param uuid
     * @return
     */
    @Operation(summary = "Obtiene Module por UUID", description = "Devuelve un module por UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Module", content = @Content(schema = @Schema(implementation = ModuleResponse.class))),
    })
    @GetMapping("/{uuid}")
    public ResponseEntity<ModuleResponse> getModuleByUuid(@PathVariable @ValidUUID String uuid) {
        ModuleResponse response = moduleService.findByUuid(uuid);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para crear un module.
     * 
     * @param request
     * @return
     */
    @Operation(summary = "Crea un Module", description = "Crea un module")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Module a crear", content = @Content(schema = @Schema(implementation = ModuleRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Module", content = @Content(schema = @Schema(implementation = ModuleResponse.class))),
    })
    @PostMapping
    public ResponseEntity<ModuleResponse> crearModule(@RequestBody @Valid ModuleRequest request) {
        ModuleResponse response = moduleService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Metodo para actualizar un module.
     * 
     * @param uuid
     * @param request
     * @return
     */
    @Operation(summary = "Actualiza un Module", description = "Actualiza un module")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Module a actualizar", content = @Content(schema = @Schema(implementation = ModuleRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Module", content = @Content(schema = @Schema(implementation = ModuleResponse.class))),
    })
    @PutMapping("/{uuid}")
    public ResponseEntity<ModuleResponse> actualizarModule(
            @PathVariable String uuid,
            @RequestBody @Valid ModuleRequest request) {
        return ResponseEntity.ok(moduleService.update(uuid, request));
    }

    /**
     * Metodo para borrar un module.
     * 
     * @param uuid
     * @param request
     * @return
     */
    @Operation(summary = "Borrar un Module", description = "Borra un module")
    @ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Module") })
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> eliminarModule(@PathVariable String uuid) {
        moduleService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Metodo para obtener los modules paginados.
     * 
     * @param page
     * @param size
     * @param sort
     * @param index
     * @param name
     * @param status
     * @return
     */
    @Operation(summary = "Obtiene Modules de forma paginada", description = "Devuelve listado de Modules que correspondan a la solicitud")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modules paginados", content = @Content(schema = @Schema(implementation = ModuleResponse[].class))),
    })
    @GetMapping("/paginated")
    public Map<String, Object> paginado(
            @RequestParam(required = false) String indexModule,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "index_module,desc") String[] sort) {
        Page<ModuleResponse> pageModules = moduleService.paginada(indexModule, name, status,
                ControllerTools.generateOrders(page, size, sort));

        return ControllerTools.generateFooterPage(pageModules);
    }

    /**
     * Metodo para obtener todos los modules.
     * 
     * @return
     */
    @Operation(summary = "Obtiene Lista de Modules", description = "Devuelve listado de Modules")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Modules Listado corto", content = @Content(schema = @Schema(implementation = ModuleListaResponse[].class))),
    })
    @GetMapping("/list")
    public ResponseEntity<List<ModuleListaResponse>> listado() {
        return ResponseEntity.ok(moduleService.findAll());
    }
}