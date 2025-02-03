package com.aplicaciones13.gestor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aplicaciones13.gestor.model.CodigoDefinidoUsuario;
import com.aplicaciones13.gestor.services.CodigoDefinidoUsuarioService;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/cdu")
@Tag(name = "Codigo Definido por el Usuario", description = "Servicio para CRUD de Codigos Definidos por el Usuario (CDU)")
public class CodigoDefinidoUsuarioController {

    @Autowired
    private CodigoDefinidoUsuarioService codigoDefinidoUsuarioService;

    @GetMapping
    public ResponseEntity<List<CodigoDefinidoUsuario>> getAllCodigosDefinidos() {
        List<CodigoDefinidoUsuario> codigos = codigoDefinidoUsuarioService.findAll();
        return ResponseEntity.ok(codigos);
    }

    /* 
    @GetMapping("/{id}")
    public ResponseEntity<CodigoDefinidoUsuario> getCodigoDefinidoById(@PathVariable Long id) {
        CodigoDefinidoUsuario codigo = codigoDefinidoUsuarioService.findById(id);
        return ResponseEntity.ok(codigo);
    }
    */

    @PostMapping
    public ResponseEntity<CodigoDefinidoUsuario> createCodigoDefinido(@RequestBody CodigoDefinidoUsuario codigoDefinidoUsuario) {
        CodigoDefinidoUsuario createdCodigo = codigoDefinidoUsuarioService.create(codigoDefinidoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCodigo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodigoDefinidoUsuario> updateCodigoDefinido(@PathVariable Long id, @RequestBody CodigoDefinidoUsuario codigoDefinidoUsuario) {
        CodigoDefinidoUsuario updatedCodigo = codigoDefinidoUsuarioService.update(id, codigoDefinidoUsuario);
        return ResponseEntity.ok(updatedCodigo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodigoDefinido(@PathVariable Long id) {
        codigoDefinidoUsuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}