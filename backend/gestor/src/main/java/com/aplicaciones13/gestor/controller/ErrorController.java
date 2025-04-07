package com.aplicaciones13.gestor.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.model.Error;
import com.aplicaciones13.gestor.payload.request.ErrorRequest;
import com.aplicaciones13.gestor.payload.response.ErrorResponse;
import com.aplicaciones13.gestor.services.ErrorService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * Controlador de errores.
 * 
 * @author omargo33
 * @since 2025-01-12
 * 
 */
@Valid
@RestController
@RequestMapping("/api/errors")
@Tag(name = "Errores", description = "Servicio para CRUD de Errores")
public class ErrorController {

    @Autowired
    private ErrorService errorService;

    /**
     * Metodo para obtener todos los errores.
     * 
     * @param index
     * @return
     */
    @GetMapping("/index={index}")
    public ErrorResponse getErrorById(@PathVariable String index) {
        return (ErrorResponse) errorService.findByIndexError(index);
    }

    /**
     * Metodo para obtener un error por su uuid.
     * 
     * @param uuid
     * @return
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<?> getErrorByUuid(@PathVariable @ValidUUID String uuid) {
        ErrorResponse response = errorService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    /**
     * Metodo para crear un error.
     * 
     * @param errorRequest
     * @return
     */
    @PostMapping
    public ResponseEntity<?> createError(@RequestBody @Valid ErrorRequest errorRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(errorService.create(errorRequest));
    }

    /**
     * Metodo para actualizar un error por su uuid.
     * 
     * @param uuid
     * @param errorRequest
     * @return
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<ErrorResponse> updateError(
            @PathVariable @ValidUUID String uuid,
            @RequestBody @Valid ErrorRequest errorRequest) {
        return ResponseEntity.ok(errorService.update(uuid, errorRequest));
    }

    /**
     * Metodo para eliminar un error por su uuid.
     * 
     * @param uuid
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteErrorByUuid(@PathVariable String uuid) {
        errorService.deleteByUuid(uuid);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    /**
     * Metodo para obtener todos los errores con paginacion, order y busqueda por
     * index y mensaje.
     * 
     * @param page
     * @param size
     * @param sort
     * @param index
     * @param mensaje
     * @return
     */
    @GetMapping("/paginated")
    public Map<String, Object> getAllErrorsWithPagination(
            @RequestParam(required = false) String indexError,
            @RequestParam(required = false) String message,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "index_error,desc") String[] sort) {
        Page<Error> pageErrors = errorService.findByIndexErrorAndMessage(
            indexError, message, ControllerTools.generateOrders(page, size, sort));

        return ControllerTools.generateFooterPage(pageErrors);
    }
}