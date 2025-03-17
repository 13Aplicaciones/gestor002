package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * DTO para la respuesta de la entidad Module en lista
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@Schema(description = "DTO para la respuesta de la entidad Module para lista")
public class ModuleListaResponse {

    @Schema(description = "Id Module", example = "1")
    private Long idModule;

    @Schema(description = "Index con el que se conoce al module de forma simplificada", example = "module123")
    private String indexModule;

    @Schema(description = "Name del module", example = "Name del Módulo")
    private String name;

}
