package com.aplicaciones13.orchestrator.payload.response;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * DTO para la respuesta de la entidad Module
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@Schema(description = "DTO para la respuesta de la entidad Module")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ModuleResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Hidden
    private Long idModule;

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

    @Schema(description = "Listado de parametros asociados al módulo")
    private List<ParameterResponse> parameters;

    @Schema(description = "Listado de menús asociados al módulo")
    private List<MenuResponse> menus;

    @Schema(description = "Listado de combos asociados al módulo")
    private List<ComboResponse> combos;
}
