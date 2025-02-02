package com.aplicaciones13.gestor_ws.payload.request;

import com.aplicaciones13.gestor_ws.payload.common.ProgramaRequest;

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
public class ErrorRequest extends ProgramaRequest{

    @NotNull
    @Size(min=5, max = 128)
    @Schema(description = "Indice de error", example = "ERR001")
    private String indice;

    @NotNull
    @Size(max = 1024)
    @Schema(description = "Mensaje de error", example = "Error al procesar la solicitud")
    private String mensaje;

    @Size(max = 4098)
    @Schema(description = "Descripción del mensaje de error", example = "Descripción detallada del error")
    private String descripcion;
}