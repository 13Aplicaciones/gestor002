package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

import com.aplicaciones13.gestor.payload.common.UsuarioFechaProgramaResponse;

/**
 * DTO para la respuesta de la entidad Modulo
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Modulo")
public class ModuloResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "UUID del registro para busquedas", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID uuid;

    @Schema(description = "Indice con el que se conoce al modulo de forma simplificada", example = "modulo123")
    private String indice;

    @Schema(description = "Nombre del indice", example = "Nombre del Módulo")
    private String nombre;

    @Schema(description = "Contexto de aplicacion", example = "Contexto del Módulo")
    private String contexto;

    @Schema(description = "Estado del listado A=Activo, I=Inactivo y X=Eliminado", example = "A")
    private String estado;
}