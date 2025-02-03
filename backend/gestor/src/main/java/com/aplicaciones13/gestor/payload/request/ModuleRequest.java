package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.StatusAppRequest;

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
public class ModuleRequest extends StatusAppRequest {
 
    @NotNull
    @Size(max = 32)
    @Schema(description = "Index con el que se conoce al module de forma simplificada", example = "module123")
    private String index;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Name del indice", example = "Name del Módulo")
    private String name;

    
    @NotNull
    @Size(max = 128)
    @Schema(description = "Context de aplicacion", example = "Context del Módulo")
    private String context;
}
