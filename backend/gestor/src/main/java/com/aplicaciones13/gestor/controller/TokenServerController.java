package com.aplicaciones13.gestor.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor.services.TokenServerService;

@Valid
@RestController
@RequestMapping("/api/tokens")
@Tag(name = "TokenServer", description = "Servicio para CRUD de TokenServer")
public class TokenServerController {

    @Autowired
    private TokenServerService tokenServidorService;

    /*
    @GetMapping("/{id}")
    public ResponseEntity<TokenServerResponse> getTokenById(@PathVariable Long id) {
        TokenServerResponse response = tokenServidorService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<TokenServerResponse> crearToken(@RequestBody @Valid TokenServerRequest request) {
        TokenServerResponse response = tokenServidorService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TokenServerResponse> actualizarToken(
            @PathVariable Long id,
            @RequestBody @Valid TokenServerRequest request) {
        TokenServerResponse response = tokenServidorService.update(id, request);
        return ResponseEntity.ok(response);
    }
    */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarToken(@PathVariable Long id) {
        tokenServidorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}