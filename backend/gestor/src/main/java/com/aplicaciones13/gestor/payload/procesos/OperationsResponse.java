package com.aplicaciones13.gestor.payload.procesos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * DTO para la respuesta de las operaciones.
 * 
 * @author omargo33
 * @since 2025-01-22
 */
@Data
public class OperationsResponse {

    @Schema(description = "Status del proceso", example = "Ok")
    private String status; // Status de la operación (e.g., "success", "error")

    @Schema(description = "Message del proceso", example = "Clave temporal generada")
    private String message;

    @Schema(description = "Código de error o éxito http status", example = "200")
    private int code;

    @Schema(description = "Datos de la respuesta json de respuesta al proceso", example = "{'claveTemporal': '123456'}")
    private Object data; 
}

