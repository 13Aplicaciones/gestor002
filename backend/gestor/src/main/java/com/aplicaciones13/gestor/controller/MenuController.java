package com.aplicaciones13.gestor.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplicaciones13.gestor.payload.request.MenuRequest;
import com.aplicaciones13.gestor.payload.response.MenuResponse;
import com.aplicaciones13.gestor.services.MenuService;

import java.util.List;

@Valid
@RestController
@RequestMapping("/api/menus")
@Tag(name = "Menus", description = "Servicio para CRUD de Menús")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<MenuResponse>> getAllMenus() {
        List<MenuResponse> response = menuService.findAll();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuResponse> getMenuById(@PathVariable Long id) {
        MenuResponse response = menuService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<MenuResponse> createMenu(@RequestBody @Valid MenuRequest request) {
        MenuResponse response = menuService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuResponse> updateMenu(@PathVariable Long id, @RequestBody @Valid MenuRequest request) {
        MenuResponse response = menuService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.delete(id);
        return ResponseEntity.noContent().build();
    }
}