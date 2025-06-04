package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el payload de respuesta para las operaciones relacionadas con la entidad Combo.
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Combo")
public class ComboResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuid;

    @Schema(description = "UUID del módulo asociado", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuidModule;

    @Schema(description = "Índice del combo", example = "0")
    private String indexCombo;

    @Schema(description = "Nombre del combo", example = "Combo de Ejemplo")
    private String name;

    @Schema(description = "Estado del combo", example = "Activo")
    private String status;
}