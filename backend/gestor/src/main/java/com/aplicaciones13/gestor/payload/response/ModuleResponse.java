package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

/**
 * DTO para la respuesta de la entidad Module
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Module")
public class ModuleResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro para busquedas", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuid;

    @Schema(description = "Index con el que se conoce al module de forma simplificada", example = "module123")
    private String indexModule;

    @Schema(description = "Name del index", example = "Name del Módulo")
    private String name;

    @Schema(description = "Context de aplicacion", example = "Context del Módulo")
    private String context;

    @Schema(description = "Status del listado A=Activo, I=Inactivo y X=Eliminado", example = "A")
    private String status;

    @Schema(description = "Orden del listado", example = "1")
    private Long orden;
}