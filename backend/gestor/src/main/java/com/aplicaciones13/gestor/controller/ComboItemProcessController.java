package com.aplicaciones13.gestor.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.services.ComboItemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;

/**
 * Clase controladora para las operaciones de user.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Validated
@RestController
@RequestMapping("/api/combo-item/process")
@Tag(name = "Combo Item Operaciones", description = "Operaciones relacionadas con combo items")
public class ComboItemProcessController {

    private final ComboItemService comboItemService;

    /**
     * Constructor de ComboItemProcessController.
     * 
     * @param comboItemService Servicio de ítems de combo
     */
    public ComboItemProcessController(ComboItemService comboItemService) {
        this.comboItemService = comboItemService;
    }

    /**
     * Bloquea un ítem de combo.
     * 
     * @param lockRequest
     * @return
     */
    @GetMapping("/changeOrder/uuid={uuid}&action={action}")
    @Operation(summary = "Cambia el orden de un ítem de combo", description = "Cambia el orden de un ítem de combo según la acción especificada", responses = {
            @ApiResponse(responseCode = "204", description = "Ítem de combo ordenado exitosamente"),
    })
    public ResponseEntity<Void> changeOrder(@PathVariable String uuid, @PathVariable String action) {
        comboItemService.changeOrder(uuid, action);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
