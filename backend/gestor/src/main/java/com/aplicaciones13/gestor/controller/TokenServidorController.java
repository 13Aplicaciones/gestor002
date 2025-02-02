package com.aplicaciones13.gestor_ws.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.gestor_ws.services.TokenServidorService;

@Valid
@RestController
@RequestMapping("/api/tokens")
@Tag(name = "TokenServidor", description = "Servicio para CRUD de TokenServidor")
public class TokenServidorController {

    @Autowired
    private TokenServidorService tokenServidorService;

    /*
    @GetMapping("/{id}")
    public ResponseEntity<TokenServidorResponse> getTokenById(@PathVariable Long id) {
        TokenServidorResponse response = tokenServidorService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<TokenServidorResponse> crearToken(@RequestBody @Valid TokenServidorRequest request) {
        TokenServidorResponse response = tokenServidorService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TokenServidorResponse> actualizarToken(
            @PathVariable Long id,
            @RequestBody @Valid TokenServidorRequest request) {
        TokenServidorResponse response = tokenServidorService.update(id, request);
        return ResponseEntity.ok(response);
    }
    */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarToken(@PathVariable Long id) {
        tokenServidorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}