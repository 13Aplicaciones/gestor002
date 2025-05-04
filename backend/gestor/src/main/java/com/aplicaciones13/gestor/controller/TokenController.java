package com.aplicaciones13.gestor.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.payload.request.TokenEmailRequest;
import com.aplicaciones13.gestor.payload.response.TokenResponse;
import com.aplicaciones13.gestor.services.TokenService;

/**
 * Controlador para el manejo de tokens.
 * 
 * @author omargo33
 * @since 2025-05-04
 */
@Valid
@RestController
@RequestMapping("/api/token")
@Tag(name = "Token", description = "Servicio para manejo custom no CRUD de TokenServer")
public class TokenController {

    @Autowired
    private TokenService tokenService;

    /**
     * Metodo para obtener un token por su uuid.
     * 
     * @param uuidUser
     * @return
     */
    @Operation(summary = "Buscar Tokens", description = "Buscar tokens")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Token a buscar", content = @Content(schema = @Schema(implementation = String.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "TokenResponse", content = @Content(schema = @Schema(implementation = TokenResponse.class))),
    })
    @GetMapping("/{uuidUser}")
    public ResponseEntity<List<TokenResponse>> getTokenByUser(@PathVariable @ValidUUID String uuidUser) {
        List<TokenResponse> response = tokenService.findByUuidUser(uuidUser);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para crear un token para correo.
     * 
     * @param request
     * @return
     */
    @Operation(summary = "Crea un Token", description = "Crea un token")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Token a crear", content = @Content(schema = @Schema(implementation = TokenEmailRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "TokenResponse", content = @Content(schema = @Schema(implementation = TokenResponse.class))),
    })
    @PostMapping("/email")
    public ResponseEntity<TokenResponse> crearToken(@RequestBody @Valid TokenEmailRequest request) {
        TokenResponse response = tokenService.createEmail(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Metodo para borrar un token por uuid.
     * 
     * @param uuidUser
     * @return
     */
    @Operation(summary = "Borra un Token", description = "Borra un token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Token borrado exitosamente"),
    })
    @DeleteMapping("/{uuidUser}")
    public ResponseEntity<Void> deleteToken(@PathVariable @ValidUUID String uuidUser) {
        tokenService.deleteByUuidUser(uuidUser);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}