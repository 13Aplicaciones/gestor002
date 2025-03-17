package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación de un error.
 * 
 * @author omargo33
 * @fecha 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación de un error")
public class ErrorRequest extends AppRequest{

    @NotNull
    @Size(min=5, max = 128)
    @Schema(description = "Index de error", example = "ERR001")
    private String indexError;

    @NotNull
    @Size(max = 1024)
    @Schema(description = "Message de error", example = "Error al procesar la solicitud")
    private String message;

    @Size(max = 4098)
    @Schema(description = "Descripción del mensaje de error", example = "Descripción detallada del error")
    private String description;
}