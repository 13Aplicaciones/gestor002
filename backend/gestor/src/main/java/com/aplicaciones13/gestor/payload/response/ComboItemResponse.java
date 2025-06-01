package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el payload de respuesta para las operaciones relacionadas con la entidad ComboItem.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad ComboItem")
public class ComboItemResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuid;

    @Schema(description = "ID del combo al que pertenece", example = "1")
    private Long idCombo;

    @Schema(description = "Nombre del ítem del combo", example = "Opción 1")
    private String name;

    @Schema(description = "Estado del ítem: A=Activo, I=Inactivo, X=Eliminado", example = "A")
    private String status;
}