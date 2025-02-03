package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.EstadoProgramaRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * DTO para la solicitud de creación o actualización de un módulo.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un módulo")
public class ModuloRequest extends EstadoProgramaRequest {
 
    @NotNull
    @Size(max = 32)
    @Schema(description = "Indice con el que se conoce al modulo de forma simplificada", example = "modulo123")
    private String indice;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del indice", example = "Nombre del Módulo")
    private String nombre;

    
    @NotNull
    @Size(max = 128)
    @Schema(description = "Contexto de aplicacion", example = "Contexto del Módulo")
    private String contexto;
}
