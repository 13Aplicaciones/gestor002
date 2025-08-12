package com.aplicaciones13.gestor.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.services.MenuService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controller para mapear los procesos del menú.
 * 
 * @author omargo33
 * @since 2025-08-03
 */
@Validated
@RestController
@RequestMapping("/api/menus/process")
@Tag(name = "Menus Process Controller", description = "Controller for managing menu processes")
public class MenuProcessController {
    
    private final MenuService menuService;

    /**
     * Constructor for MenuProcessController.
     *
     * @param menuService the service to handle menu operations
     */
    public MenuProcessController(MenuService menuService) {
        this.menuService = menuService;
    }

    /**
     * Changes the order of a menu item based on its UUID and the specified action.
     *
     * @param uuid   the UUID of the menu item
     * @param action the action to perform (e.g., "up" or "down")
     * @return a ResponseEntity indicating the result of the operation
     */
    @GetMapping("/changeOrder/uuid={uuid}&action={action}")
    @Operation(summary = "Cambio del orden del menu", description = "Cambia el orden de un elemento del menu<br><br>✅ Testado con Postman<br><br>❌ GUI")
    public ResponseEntity<Void> changeOrder(@PathVariable String uuid, @PathVariable String action) {
        menuService.changeOrder(uuid, action);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
