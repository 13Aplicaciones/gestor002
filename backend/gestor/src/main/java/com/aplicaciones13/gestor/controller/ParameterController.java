package com.aplicaciones13.gestor.controller;

import com.aplicaciones13.gestor.payload.request.ParameterRequest;
import com.aplicaciones13.gestor.payload.response.ParameterResponse;
import com.aplicaciones13.gestor.services.ParameterService;

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
@RequestMapping("/api/parameters")
@Tag(name = "Parameters", description = "Servicio para CRUD de Parameters")
public class ParameterController {

    @Autowired
    private ParameterService parameterService;

    @GetMapping("/{index}")
    public ResponseEntity<ParameterResponse> getParameterByIndex(@PathVariable String index) {
        ParameterResponse response = parameterService.findByIndex(index);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ParameterResponse> crearParameter(@RequestBody @Valid ParameterRequest request) {
        ParameterResponse response = parameterService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{index}")
    public ResponseEntity<ParameterResponse> actualizarParameter(
            @PathVariable String index,
            @RequestBody @Valid ParameterRequest request) {
        ParameterResponse response = parameterService.update(index, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{index}")
    public ResponseEntity<Void> eliminarParameter(@PathVariable String index) {
        parameterService.delete(index);
        return ResponseEntity.noContent().build();
    }
}