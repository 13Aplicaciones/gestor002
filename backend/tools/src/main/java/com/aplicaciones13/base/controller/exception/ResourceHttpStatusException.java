package com.aplicaciones13.base.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase para manejar errores de recurso no encontrado de manera personalizada.
 * 
 * @author omargo33
 * @see com.qapaq.controller.GlobalExceptionHandler
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceHttpStatusException extends RuntimeException {

    private final HttpStatusCode httpStatusCode;

    /**
     * Constructor de la clase.
     * 
     * @param message
     */
    public ResourceHttpStatusException(String message, HttpStatusCode httpStatusCode) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }
}
