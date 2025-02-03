package com.aplicaciones13.gestor.payload.response;

import java.util.UUID;

import com.aplicaciones13.gestor.payload.common.UserDateAppResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * Clase que representa el payload de respuesta para las operaciones relacionadas con la entidad Information.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Information")
public class InformationResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID uuid;

    @Schema(description = "Name de la información", example = "Información de ejemplo")
    private String name;

    @Schema(description = "Valor 01", example = "Valor 1")
    private String value01;

    @Schema(description = "Valor 02", example = "Valor 2")
    private String value02;
}