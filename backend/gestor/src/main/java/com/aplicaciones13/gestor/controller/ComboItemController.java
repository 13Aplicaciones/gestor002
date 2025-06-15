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
import com.aplicaciones13.base.payload.common.LovResponse;
import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.payload.request.ComboItemRequest;
import com.aplicaciones13.gestor.payload.response.ComboItemResponse;
import com.aplicaciones13.gestor.services.ComboItemService;
import com.aplicaciones13.gestor.services.LovService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * Controlador REST para la gestión de ítems de combo.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@RestController
@RequestMapping("/api/combo-item")
@Tag(name = "Combo Item", description = "Servicio para CRUD de ítems de combo")
public class ComboItemController {

    private final ComboItemService comboItemService;
    private final LovService lovService;

    /**
     * Constructor de ComboItemController.
     * 
     * @param comboItemService
     */
    public ComboItemController(ComboItemService comboItemService, LovService lovService) {
        this.comboItemService = comboItemService;
        this.lovService = lovService;
    }

    /**
     * Actualizar un ítem de combo.
     * 
     * @param uuid identificador único del ítem de combo
     * @param comboItemRequest nuevos datos del ítem de combo
     * @return respuesta con el ítem de combo actualizado
     */
    @PutMapping("/{uuid}")
    @Operation(summary = "Actualizar ítem de combo", description = "Actualiza un ítem de combo existente")
    public ResponseEntity<ComboItemResponse> actualizarComboItem(
            @PathVariable @ValidUUID String uuid,
            @Valid @RequestBody ComboItemRequest comboItemRequest) {
        return ResponseEntity.ok(comboItemService.update(uuid, comboItemRequest));
    }

    /**
     * Crear un nuevo ítem de combo.
     * 
     * @param request datos del nuevo ítem de combo
     * @return respuesta con el ítem de combo creado
     */
    @PostMapping
    @Operation(summary = "Crear ítem de combo", description = "Crea un nuevo ítem de combo")
    public ResponseEntity<ComboItemResponse> crearComboItem(@RequestBody @Valid ComboItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(comboItemService.create(request));
    }

    /**
     * Eliminar un ítem de combo.
     * 
     * @param uuid identificador único del ítem de combo
     * @return respuesta vacía
     */
    @DeleteMapping("/{uuid}")
    @Operation(summary = "Eliminar ítem de combo", description = "Elimina un ítem de combo específico")
    public ResponseEntity<Void> eliminarComboItem(@PathVariable @ValidUUID String uuid) {
        comboItemService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Método para obtener todos los ítems de combo de manera paginada.
     * 
     * @param page número de página
     * @param size tamaño de página
     * @param sort configuración de ordenamiento
     * @param indexComboItem índice del ítem de combo a buscar
     * @param label etiqueta del ítem de combo a buscar
     * @param descripcion descripción del ítem de combo a buscar
     * 
     * @return respuesta paginada con los ítems de combo
     */
    @GetMapping("/paginated")
    @Operation(summary = "Obtiene la lista de ítems de combo paginados", 
               description = "Recibe los parámetros de paginación y filtrado", 
               responses = {
                   @ApiResponse(responseCode = "200", description = "Ítems de combo recuperados exitosamente", 
                               content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)))
               })
    public ResponseEntity<Map<String, Object>> getAllComboItemWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "orden,asc") String[] sort,
            @RequestParam(required = true) String indexComboItem,
            @RequestParam(required = false) String label,
            @RequestParam(required = false) String descripcion) {
        Page<ComboItemResponse> pageComboItem = comboItemService.findByIndexOrLabelOrDescription(indexComboItem, label, descripcion, ControllerTools.generateOrders(page, size, sort));

        Map<String, Object> response = ControllerTools.generateFooterPage(pageComboItem);
        return ResponseEntity.ok(response);
    }


    /**
     * Método para obtener un LOV (List of Values) de ítems de combo paginado.
     * 
     * @param page
     * @param size
     * @param sort
     * @param searchTerm
     * @return
     */
    @GetMapping("/lov")
    @Operation(summary = "Obtiene LOV paginado", 
               description = "Recibe los parámetros de paginación y filtrado", 
               responses = {
                   @ApiResponse(responseCode = "200", description = "Items de busqueda LOV recuperados exitosamente", 
                               content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)))
               })    
    public ResponseEntity<Map<String, Object>> getComboItemLov(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "label,asc") String[] sort,
            @RequestParam(required = false) String searchTerm) {
        Page<LovResponse> pageComboItem = lovService.findLovComboItem(searchTerm,
                ControllerTools.generateOrders(page, size, sort));

        Map<String, Object> response = ControllerTools.generateFooterPage(pageComboItem);
        return ResponseEntity.ok(response);
    }

    /**
     * Método para obtener un ítem de combo por su UUID.
     * 
     * @param uuid identificador único del ítem de combo
     * @return respuesta con el ítem de combo encontrado
     */
    @GetMapping("/{uuid}")
    @Operation(summary = "Obtener ítem de combo por UUID", description = "Obtiene un ítem de combo específico por su UUID")
    public ResponseEntity<ComboItemResponse> getComboItemByUuid(@PathVariable @ValidUUID String uuid) {
        ComboItemResponse response = comboItemService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }
}