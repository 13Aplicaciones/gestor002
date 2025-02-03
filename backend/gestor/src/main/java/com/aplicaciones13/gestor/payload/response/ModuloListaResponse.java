package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * DTO para la respuesta de la entidad Modulo en lista
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@Schema(description = "DTO para la respuesta de la entidad Modulo para lista")
public class ModuloListaResponse {

    @Schema(description = "Id Modulo", example = "1")
    private Long idModulo;

    @Schema(description = "Indice con el que se conoce al modulo de forma simplificada", example = "modulo123")
    private String indice;

    @Schema(description = "Nombre del modulo", example = "Nombre del Módulo")
    private String nombre;

}
