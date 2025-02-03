package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.ProgramaRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de información.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de información")
public class InformacionRequest extends ProgramaRequest{

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre de la información a relatar", example = "Información Ejemplo")
    private String nombre;

    @NotNull
    @Size(max = 256)
    @Schema(description = "Valor 01", example = "Valor 1")
    private String valor01;

    @Size(max = 256)
    @Schema(description = "Valor 02", example = "Valor 2")
    private String valor02; 
}