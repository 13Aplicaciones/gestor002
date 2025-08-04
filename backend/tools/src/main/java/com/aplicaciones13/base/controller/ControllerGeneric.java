package com.aplicaciones13.base.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import com.aplicaciones13.base.controller.exception.ResourceHttpStatusException;
import com.aplicaciones13.base.model.exception.ForeignKeyException;
import com.aplicaciones13.base.tools.Conversions;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;

/**
 * Controlador genérico para manejar excepciones de la aplicación.
 * 
 * El objetivo solo debe tener la extensión de la clase GlobalExceptionHandler
 * para manejar las excepciones de la aplicación de manera global.
 *
 * @author omargo33
 * @since 2024-12-19
 * @see com.ControllerGeneric.gs00101.controller.common.ControladorGenerico
 * 
 */
@Slf4j
public class ControllerGeneric {

    @Value("${spring.application.name}")
    private String appName;

    private Object[] arguments;
    private Map<String, String> errors = new HashMap<>();

    /**
     * Metodo para informar errores de recurso no encontrado y su utilizacion con el
     * objeto.
     * 
     * @param ex
     * @param request
     * @return
     */
    @ExceptionHandler(ResourceHttpStatusException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceHttpStatusException ex,
            WebRequest request) {
        errors.put("timestamp", Conversions.dateToStringFormat(new Date(), Conversions.ISO_8601_LARGA));
        errors.put("details", request.getDescription(false));
        errors.put("message", ex.getMessage());

        return new ResponseEntity<>(errors, ex.getHttpStatusCode());
    }

    /**
     * Metodo para informar errores de validacion.
     * 
     * Controla si el error es de validacion estandar de spring
     * Controla si el error es de validacion personalizada
     * 
     * @param ex
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {
            DataIntegrityViolationException.class,
            EmptyResultDataAccessException.class,
            ForeignKeyException.class,
            HandlerMethodValidationException.class,
            HttpMessageNotReadableException.class,
            MethodArgumentNotValidException.class,
            ConstraintViolationException.class
    })
    public ResponseEntity<Map<String, String>> handleExceptions(Object ex) {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                    .getRequest();
            errors.put("details", "uri=" + request.getRequestURI());
        } catch (Exception e) {
            log.warn("No se localiza el  URI: {}", e);
        }
        errors.put("timestamp", Conversions.dateToStringFormat(new Date(), Conversions.ISO_8601_LARGA));

        if (ex instanceof MethodArgumentNotValidException exPivot) {
            return ResponseEntity.badRequest().body(
                    validationMethodArgumentExceptions(exPivot));
        }

        if (ex instanceof ForeignKeyException exPivot) {
            return ResponseEntity.badRequest().body(foreignKeyExceptions(exPivot));
        }

        if (ex instanceof EmptyResultDataAccessException) {
            return ResponseEntity.badRequest().body(emptyResultDataAccessException());
        }

        if (ex instanceof HttpMessageNotReadableException exPivot) {
            return ResponseEntity.badRequest()
                    .body(httpMessageNotReadableException(exPivot));
        }

        if (ex instanceof DataIntegrityViolationException exPivot) {
            return ResponseEntity.badRequest()
                    .body(sqlIntegrityConstraintViolationException(exPivot));
        }

        if (ex instanceof HandlerMethodValidationException exPivot) {
            if (ex instanceof MethodArgumentNotValidException exPivot2) {
                return ResponseEntity.badRequest()
                        .body(validationMethodArgumentExceptions(exPivot2));
            }
            return ResponseEntity.badRequest()
                    .body(validationPathVariableArgumentExceptions(exPivot));
        }

        if (ex instanceof ConstraintViolationException exPivot) {
            return ResponseEntity.badRequest()
                    .body(validationConstraintViolationException(exPivot));
        }

        errors.put(getControllerMapping(), "E-GS00100-2");
        return ResponseEntity.badRequest().body(errors);
    }

    /**
     * Metodo para informar errores de validacion personalizada de constraints.
     * 
     * Valida UUID
     * 
     * @param ex
     * @return
     */
    private Map<String, String> validationConstraintViolationException(ConstraintViolationException ex) {
        ex.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    /**
     * Metodo para informar errores de validacion personalizada de pathVariable.
     * 
     * @param ex
     * @return
     */
    private Map<String, String> validationPathVariableArgumentExceptions(HandlerMethodValidationException ex) {
        ex.getAllErrors().forEach(error -> {
            String errorMessage = error.getDefaultMessage();
            String fieldName = "";
            try {
                fieldName = ((FieldError) error).getField();
            } catch (Exception e) {
                arguments = error.getArguments();
                if (arguments.length > 1) {
                    fieldName = String.valueOf(arguments[1]);
                } else {
                    fieldName = getControllerMapping();
                }
            }
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    /**
     * Metodo para informar errores de validacion estandar de spring.
     * 
     * @param ex
     * @return
     */
    private Map<String, String> validationMethodArgumentExceptions(MethodArgumentNotValidException ex) {
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String errorMessage = error.getDefaultMessage();
            String fieldName = "";

            try {
                fieldName = ((FieldError) error).getField();
            } catch (Exception e) {
                arguments = error.getArguments();
                if (arguments.length > 1) {
                    fieldName = String.valueOf(arguments[1]);
                } else {
                    fieldName = error.getObjectName();
                }
            }
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    /**
     * Metodo para informar errores de validacion personalizada de llaves foraneas.
     * 
     * @param ex
     * @return
     */
    private Map<String, String> foreignKeyExceptions(ForeignKeyException ex) {
        errors.put(getControllerMapping(), ex.getMessage());
        return errors;
    }

    /**
     * Metodo para informar errores de no hay resultados al SQL.
     */
    private Map<String, String> emptyResultDataAccessException() {
        errors.put(getControllerMapping(), "E-GS00100-8");
        return errors;
    }

    /**
     * Metodo para obtener el name del RequestMapping de la clase.
     */
    private String getControllerMapping() {
        try {
            String controllerMapping = this.getClass().getAnnotation(RequestMapping.class).value()[0];
            controllerMapping = controllerMapping.replace("/", "");
            return controllerMapping;
        } catch (Exception e) {
            return "message";
        }
    }

    /**
     * Metodo para informar errores de validacion personalizada de formato de fechas
     * de rest.
     * 
     * Y los demas errores dejar que los maneje el estandar de spring.
     * 
     * @param ex
     * @return
     */
    private Map<String, String> httpMessageNotReadableException(HttpMessageNotReadableException ex) {
        String message = ex.toString();
        if (message.lastIndexOf("java.util.Date") > 1) {
            errors.put(getControllerMapping(), "E-GS00100-18");
        } else if (message.toUpperCase().lastIndexOf(" ENUM ") > 1) {
            int inicio = message.lastIndexOf("[");
            int fin = message.lastIndexOf("]");
            errors.put(getControllerMapping(), message.substring(inicio + 1, fin));
        } else {
            log.warn("Falta validacion de {} para {}", ex.getClass().getName(), ex.toString());
            throw new IllegalStateException(ex.toString());
        }
        return errors;
    }

    /**
     * Metodo para informar errores de integridad de datos violada.
     * 
     * Uso de llaves foraneas.
     * Uso de Campos unicos.
     * Y otros definiciones de constraints.
     * 
     * Por favor consultar el log para validar la alerta.
     * 
     * @param ex
     * @return
     */
    private Map<String, String> sqlIntegrityConstraintViolationException(DataIntegrityViolationException ex) {
        Throwable rootCause = ex.getRootCause();
        String messageRoot = (rootCause != null) ? rootCause.getMessage() : "Integridad de datos violada";
        String message = ex.getMessage();
        log.warn("La integridad esta comprometida en: {} y {}", message, messageRoot);
        errors.put(getControllerMapping(), message);
        return errors;
    }
}
