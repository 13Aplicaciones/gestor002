package com.aplicaciones13.gestor.controller;

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
import com.aplicaciones13.gestor.payload.request.ComboRequest;
import com.aplicaciones13.gestor.payload.response.ComboResponse;
import com.aplicaciones13.gestor.services.ComboService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * Controlador para la gestión de Combos.
 * 
 * Este controlador proporciona endpoints para crear, actualizar, eliminar y
 * obtener combos.
 * 
 * @autor omargo33
 * @since 2025-06-03
 */
@RestController
@RequestMapping("/api/combo")
@Tag(name = "Combo", description = "Servicio para CRUD de Combo")
public class ComboController {

    private final ComboService comboService;

    /**
     * Constructor de ComboController.
     * 
     * @param comboService
     */
    public ComboController(ComboService comboService) {
        this.comboService = comboService;
    }

    /**
     * Actualizar un combo.
     * 
     * @param uuid
     * @param comboRequest
     * @return
     */
    @PutMapping("/{uuid}")
    @Operation(summary = "Actualizar combo", description = "Actualiza un combo existente con los datos proporcionados", responses = {
            @ApiResponse(responseCode = "200", description = "Combo actualizado exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComboResponse.class)))
    }, requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos del combo a actualizar", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComboRequest.class))))
    public ResponseEntity<ComboResponse> actualizarCombo(
            @PathVariable String uuid,
            @Valid @RequestBody ComboRequest comboRequest) {
        return ResponseEntity.ok(comboService.update(uuid, comboRequest));
    }

    /**
     * Crear un nuevo combo.
     * 
     * @param request Datos del nuevo combo.
     * @return Respuesta con el combo creado.
     */
    @PostMapping
    @Operation(summary = "Crear combo", description = "Crea un nuevo combo con los datos proporcionados", responses = {
            @ApiResponse(responseCode = "201", description = "Combo creado exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComboResponse.class)))
    }, requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos del combo a crear", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = ComboRequest.class))))
    public ResponseEntity<ComboResponse> crearCombo(@RequestBody @Valid ComboRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(comboService.create(request));
    }

    /**
     * Eliminar un combo.
     * 
     * @param uuid
     * @return
     */
    @DeleteMapping("/{uuid}")
    @Operation(summary = "Eliminar combo", description = "Elimina un combo específico")
    public ResponseEntity<Void> eliminarCombo(@PathVariable @ValidUUID String uuid) {
        comboService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Método para obtener todos los combos de manera paginada.
     * 
     * @param page
     * @param size
     * @param sort
     * @param name
     * @return
     */
    @GetMapping("/paginated")
    @Operation(summary = "Obtiene la lista de combos paginados", description = "Recibe los parámetros de paginación y filtrado", responses = {
            @ApiResponse(responseCode = "200", description = "Combos recuperados exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)))
    })
    public ResponseEntity<Map<String, Object>> getAllCombosWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,desc") String[] sort,
            @RequestParam(required = true) String uuidModule,
            @RequestParam(required = false) String name) {
        Page<ComboResponse> pageCombos = comboService.findByNameContaining(uuidModule, name,
                ControllerTools.generateOrders(page, size, sort));

        Map<String, Object> response = ControllerTools.generateFooterPage(pageCombos);
        return ResponseEntity.ok(response);
    }

    /**
     * Método para obtener un combo por su UUID.
     * 
     * @param uuid
     * @return
     */
    @GetMapping("/{uuid}")
    @Operation(summary = "Obtener ítem de combo por UUID", description = "Obtiene un ítem de combo específico por su UUID")
    public ResponseEntity<ComboResponse> getComboByUuid(@PathVariable @ValidUUID String uuid) {
        ComboResponse response = comboService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }
}