package com.aplicaciones13.gestor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplicaciones13.gestor.model.UserDefinedCode;
import com.aplicaciones13.gestor.services.UserDefinedCodeService;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/cdu")
@Tag(name = "Codigo Definido por el user", description = "Servicio para CRUD de Codigos Definidos por el user (CDU)")
public class UserDefinedCodeController {

    @Autowired
    private UserDefinedCodeService userDefinedCodeService;

    @GetMapping
    public ResponseEntity<List<UserDefinedCode>> getAllCodigosDefinidos() {
        List<UserDefinedCode> codigos = userDefinedCodeService.findAll();
        return ResponseEntity.ok(codigos);
    }

    /* 
    @GetMapping("/{id}")
    public ResponseEntity<UserDefinedCode> getCodigoDefinidoById(@PathVariable Long id) {
        UserDefinedCode codigo = codigoDefinidouserService.findById(id);
        return ResponseEntity.ok(codigo);
    }
    */

    @PostMapping
    public ResponseEntity<UserDefinedCode> createCodigoDefinido(@RequestBody UserDefinedCode UserDefinedCode) {
        UserDefinedCode createdCodigo = userDefinedCodeService.create(UserDefinedCode);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCodigo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDefinedCode> updateCodigoDefinido(@PathVariable Long id, @RequestBody UserDefinedCode UserDefinedCode) {
        UserDefinedCode updatedCodigo = userDefinedCodeService.update(id, UserDefinedCode);
        return ResponseEntity.ok(updatedCodigo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodigoDefinido(@PathVariable Long id) {
        userDefinedCodeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}