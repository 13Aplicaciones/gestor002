package com.aplicaciones13.gestor_ws.controller;

import com.aplicaciones13.gestor_ws.payload.request.ParametroRequest;
import com.aplicaciones13.gestor_ws.payload.response.ParametroResponse;
import com.aplicaciones13.gestor_ws.services.ParametroService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

@Valid
@RestController
@RequestMapping("/api/parametros")
@Tag(name = "Parametros", description = "Servicio para CRUD de Parametros")
public class ParametroController {

    @Autowired
    private ParametroService parametroService;

    @GetMapping("/{indice}")
    public ResponseEntity<ParametroResponse> getParametroByIndice(@PathVariable String indice) {
        ParametroResponse response = parametroService.findByIndice(indice);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ParametroResponse> crearParametro(@RequestBody @Valid ParametroRequest request) {
        ParametroResponse response = parametroService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{indice}")
    public ResponseEntity<ParametroResponse> actualizarParametro(
            @PathVariable String indice,
            @RequestBody @Valid ParametroRequest request) {
        ParametroResponse response = parametroService.update(indice, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{indice}")
    public ResponseEntity<Void> eliminarParametro(@PathVariable String indice) {
        parametroService.delete(indice);
        return ResponseEntity.noContent().build();
    }
}